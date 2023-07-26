## Overview

This workflow demonstrates the creation of a multinode Kubernetes cluster on AWS which utilises Flight Solo to automatically configure nodes as workers in the Kubernetes cluster upon boot.

## Prepare Network

1. Create a VPC with
    1. Name: kubecluster1
1. In "VPC and More"
    1. IPv4 Subnet Block: 10.10.0.0/16
    1. Number of Availability Zones: 1
    1. Public Subnets: 1
    1. Private Subnets: 0
    1. VPC Endpoints: None
1. Create a Security Group with
    1. Name: kubecluster1-sg
    1. Description: "Security group for kubecluster1 cluster"
    1. VPC: kubecluster
1. Inbound Rules
    1. "SSH" from "Anywhere-IPv4"
    1. "HTTP" from "Anywhere-IPv4"
    1. "HTTPS" from "Anywhere-IPv4"
    1. "All Traffic" from 10.10.0.0/16

## Build Login Node

Launch the Flight Solo image in AWS marketplace

1. Select "Launch from EC2"
1. Instance Type: t3.2xlarge
1. Click "Edit" on Network Settings and
1. VPC: kubecluster1Auto-assign public IP: Enable
1. Select existing security group: kubecluster1-sg
1. Set root volume size to at least 20GB
1. Under Advanced Details -> User Data, add this:
    ```yaml
    #cloud-config
    write_files:
      - content: |
          SHAREPUBKEY="true"
          AUTOPARSEMATCH=".*"
          AUTH_KEY=kubecluster1
        path: /opt/flight/cloudinit.in
        permissions: '0644'
        owner: root:root
    ```

!!! note
    The above data will enable sharing the public key to clients, automatically add any nodes that connect to hunter with a correct auth key, and secure node hunting with the authorisation key of kubecluster1. For more information see the [user data documentation](../../understand-solo/user-data.md)

## Configure Login Node

1. Parse & Label Login Node
    1. Run the command `flight hunter parse`.
    1. Select the node with ++space++
    1. Press ++down++ to erase the field.
    1. Type in `login1` as the label and press ++enter++.
1. Run flight profile configure and Select `OpenFlight Kubernetes Multinode`
    1. Cluster Name: kubecluster1
    1. Default user: flight
    1. Set user password to: Some secure password
    1. NFS server (hostname or flight-hunter label): login1
    1. IP or FQDN for Web Access: Public IPv4 DNS from AWS EC2 Console for Node
    1. IP Range of Compute Nodes: 10.10.0.0/16
    1. IP Range of Kubernetes Pods (must not overlap with Compute Node IP Range): 192.168.0.0/16
1. Apply the master profile to login1 with `flight profile apply login1 master`
1. Wait for flight profile list to show the status of login1 as completed (`flight profile view login1 --watch`) 
1. Setup Automatic Application of Hunter Nodes
    1. Add the following lines to `/opt/flight/opt/hunter/etc/config.yml` to automatically apply the worker profile to hunter nodes with labels containing `node`.
        ```yaml
        auto_apply:
          node: worker
        ```

        !!! note
            You will need to use sudo to have permissions to edit this config file.

    1. Restart hunter service
        ```bash
        flight service restart hunter
        ```

## Launch a Compute Node

Launch the Flight Solo image in AWS marketplace

1. Select "Launch from EC2"
    1. Instance Type: t3.2xlarge
    1. Click "Edit" on Network Settings and select:
        1. VPC: kubecluster1
        1. Auto-assign public IP: Disable
        1. Select existing security group: kubecluster1-sg
    1. Set root volume size to at least 20GB
    1. Under Advanced Details -> User Data (replace `LOGIN_SERVER_IPV4_PRIVATE_ADDRESS` with the IP of the login node, this can be found with ip addr on that system)
        ```yaml
        #cloud-config
        write_files:
          - content: |
              SERVER=<LOGIN_SERVER_IPV4_PRIVATE_ADDRESS>
              LABEL=node01
              AUTH_KEY=kubecluster1
            path: /opt/flight/cloudinit.in
            permissions: '0644'
            owner: root:root
        ```
1. Repeat the above to create more nodes, changing the `LABEL=` field in the cloud-init data to be a unique label.

## Checking it Works

Congratulations! You now have an automatically expanding Kubernetes cluster!

Once the compute node has come up it will be automatically added to the accepted list of hosts for
the cluster (see `flight hunter list` ) and will have the Kubernetes worker profile applied to it
automatically (see `flight profile list` ).

What you can do next is:

- Seamlessly access the cluster via the Flight Web Suite in a web browser by visiting the Public IPv4 DNS from AWS EC2 Console for the login node
- Run some kubernetes pods
- Remove unused nodes from the cluster before deleting them from AWS

