
To set up a cluster, you will need to [import a Flight Solo image](../get-solo/index.md).

Before setting up a cluster on Concertim Cloud, there are several required prerequisites:

- [Your own keypair](https://alces-cloud-docs.alces-flight.com/starter/key/)
- [A network with a subnet and a router bridging the subnet to the external network](https://alces-cloud-docs.alces-flight.com/networking/networks/)
- [A security group](https://alces-cloud-docs.alces-flight.com/networking/secgroups/) that allows traffic is given below (if creating the security group through the web interface then the "Any" protocol will need to be an "Other Protocol" rule with "IP Protocol" of `-1`)

| Protocol   |      Direction      |  CIDR | Port Range |
|:----------:|:-------------:|:------:|:------:|
| Any | egress | 0.0.0.0/0  | any |
| Any | ingress  |   Virtual Network CIDR | any|
| ICMP | ingress |  0.0.0.0/0 | any |
| SSH | ingress |  0.0.0.0/0 | 22 |
| TCP | ingress |  0.0.0.0/0 | 80 |
| TCP | ingress |  0.0.0.0/0 | 443 |
| TCP | ingress |  0.0.0.0/0 | 5900-5903 |

!!! note
    The "Virtual Network CIDR" is the subnet and netmask for the network that the nodes are using. For example, a node on the 11.11.11.0 network with a netmask of 255.255.255.0 would have a network CIDR of 11.11.11.0/24.

1. Launch a login node with a command similar to the following: 

    ```bash
    $ openstack server create --flavor p1.small \
                              --image "Flight Solo VERSION" \
                              --boot-from-volume 16 \
                              --network "mycluster1-network" \
                              --key-name "MyKey" \
                              --security-group "mycluster1-sg" \
                              --user-data myuserdata.yml \
                              login1
    ```

    - Where:

        - `flavor` - Is the desired size of the instance
        - `image` - Is the Flight Solo image imported to Concertim Cloud
        - `boot-from-volume` - Is the size of the system disk in GB
        - `network` - Is the name or ID of the network created for the cluster
        - `key-name` - Is the name of the SSH key to use
        - `security-group` - Is the name or ID of the security group created previously
        - `user-data` - Is the file containing cloud-init user-data (this is optional in standalone scenarios)
        - `login1` - Is the name of the system

1. Associate a floating IP, either by using an existing one or creating a new one

    1. To use an existing floating IP
    
        1. Identify the IP address of an available floating IP (`Port` will be `None`)

            ```bash
            $ openstack floating ip list
            +---------------------+---------------------+------------------+---------------------+---------------------+-----------------------+
            | ID                  | Floating IP Address | Fixed IP Address | Port                | Floating Network    | Project               |
            +---------------------+---------------------+------------------+---------------------+---------------------+-----------------------+
            | 726318f4-4dbb-4d51- | 10.199.31.6         | None             | None                | c681d94b-e2ec-4b73- | dcd92da7538a4f64a42b0 |
            | b119-d9e53c47a9f5   |                     |                  |                     | 89bf-9943bcce3255   | d4d9ce8845f           |
            ```

        1. Associate the floating IP with the instance

            ```bash
            $ openstack server add floating ip login1 10.199.31.6
            ```

    1. To create a new floating IP 

        1. Create new floating IP and note the `floating_ip_address` 

            ```bash
            $ openstack floating ip create external1
            ```
        1. Associate the floating IP with the instance (using the `floating_ip_address` from the previous output)

            ```bash
            $ openstack server add floating ip login1 10.199.31.212
            ```

Further detail on collecting the information from the above can be found in the [Concertim Cloud documentation](https://alces-cloud-docs.alces-flight.com/starter/instance/).
