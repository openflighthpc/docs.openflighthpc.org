# SLURM Standalone on OpenStack with Auto-Configure

## Overview

This workflow demonstrates the creation of a standalone slurm cluster on Openstack which utilises Flight Solo to automatically configure the node upon boot. It is assumed that you have a flight solo image on openstack, if not see the documentation [here](../../get-solo/openstack.md).

## Prepare Network

Preparing the network, router and subnet is out of scope for this documentation, so it is assumed that this is already done. See the [Openstack documentation](https://docs.openstack.org/install-guide/launch-instance.html#create-virtual-networks) for more information.

1. Create a Security Group with
    1. Name: `autostandalone1-sg`
    1. Description: "Security group for automatic standalone cluster"
    1. Ingress Rules
        1. "SSH",  remote: "CIDR", CIDR: "`0.0.0.0/0`"
        1. "HTTP",  remote: "CIDR", CIDR: "`0.0.0.0/0`"
        1. "HTTPS",  remote: "CIDR", CIDR: "`0.0.0.0/0`"
        1. "All TCP", remote: "Security Group",  from this security group
        1. "All UDP", remote: "Security Group",  from this security group
1. Create a keypair with
    1. Key Pair Name: `autostandalone-key`
    1. Key Type: SSH Key

## Launch the instance

1. Click Launch Instance.
    1. Details:
        1. Instance Name: `auto-slurm`
        1. Count: `1`
    1. Source:
        1. Volume Size: `20`
        1. Image: imported Flight Solo image
    1. Flavour: `m1.medium`
    1. Networks: your network
    1. Configuration
        1. Customisation script
            ```yaml
            #cloud-config
            write_files:
            - content: |
                LABEL="standalone1"
                AUTOPARSEMATCH="auto"
                PROFILE_ANSWERS='{"cluster_type": "openflight-slurm-standalone",  "cluster_name": "my-cluster",  "default_username": "flight",  "default_password": "0penfl1ght"}'
                AUTOAPPLY="standalone: all-in-one"
              path: /opt/flight/cloudinit.in
              permissions: '0600'
              owner: root:root
            users:
              - default
            ```
1. Press Launch Instance
1. Wait for the node to finish building, and associate it with a floating ip from the node's drop down menu.

!!! tip
    The progress of the auto-configuration can be checked with `flight profile view standalone1 --watch`

## Checking it works

Congratulations! You now have a Slurm Standalone Cluster!

Once the node has come up it will automatically configure and set up the slurm profile on itself (see `flight profile list` ), with no more human interaction required before it is ready to run jobs.

What you can do next is:
- Seamlessly access the cluster via the Flight Web Suite in a web browser by visiting the Floating IP you assigned it.
- Run some slurm jobs.
