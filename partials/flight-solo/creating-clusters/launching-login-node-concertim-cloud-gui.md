
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

To set up a cluster:

1. Go to the Concertim Cloud instances page.

    ![](img/alces-cloud_instances.png)

1. Click "Launch Instance", and the instance creation window will pop up.

1. Fill in the instance name, and leave the number of instances as 1, then click next.

    ![](img/alces-cloud_instance_details.png)

1. Choose the desired image to use by clicking the up arrow at the end of its row. It will be displayed in the "Allocated" section when selected.

    ![](img/alces-cloud_instance_source.png)

1. Choose the desired instance size by clicking the up arrow at the end of its row. It will be displayed in the "Allocated" section when selected.

    ![](img/alces-cloud_instance_flavours.png)

1. Choose a network in the same way as an image or instance size. Note that **all nodes in a cluster must be on the same network**.

    ![](img/alces-cloud_instance_network.png)

1. Choose a security group in the same way as an image or instance size. Note that **all nodes in a cluster must be in the same security group**.

    ![](img/alces-cloud_instance_security.png)

1. Choose the keypair in the same way as an image or instance size.

    ![](img/alces-cloud_instance_keypair.png)

1. In the "Configuration" section, there is a "Customisation Script" section with a text box. This will be used to set your [user data](../understand-solo/user-data.md)

    ![](img/alces-cloud_instance_configuration.png)

1. When all options have been selected, press the "Launch Instance" button to launch. If the button is greyed out, then a mandatory setting has not been configured.

    ![](img/alces-cloud_instance_ready.png)

1. Go to the "Instances" page in the "Compute" section. The created node should be there and be finishing or have finished creation.

    ![](img/alces-cloud_associate_ip.png)


1. Click on the down arrow at the end of the instance row. This will bring up a drop-down menu.

1. Select "Associate Floating IP", this will make the ip management window pop up.

    ![](img/alces-cloud_manage_ips.png)

1. Associate a floating IP, either by using an existing one or allocating a new one.

    1. To use an existing floating IP:

        1. Open the IP Address drop-down menu.

            ![](img/alces-cloud_manage_ips_dropdown.png)

        1. Select one of the IP Addresses.

        1. Click "Associate" to finish associating an IP.

    1. To allocate a new floating IP:

        1. Click the "+" next to the drop-down arrow to open the allocation menu.

            ![](img/alces-cloud_manage_ips_new.png)

        1. Click "Allocate IP".

1. Click "Associate" to finish associating an IP.

Further detail on collecting the information from the above can be found in the [Concertim Cloud documentation](https://alces-cloud-docs.alces-flight.com/starter/instance/).
