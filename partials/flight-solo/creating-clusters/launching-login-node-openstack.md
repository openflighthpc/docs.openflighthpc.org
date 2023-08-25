
To set up a cluster, you will need to [import a Flight Solo image](../get-solo/index.md).

Before setting up a cluster on Openstack, there are several required prerequisites:

- Your own keypair
- A network
- A router
- A security group that allows traffic through ports 22, 80, 8888, 443 and 5900-5903

The documentation includes instructions for [importing an image to Openstack](../get-solo/openstack.md), and guides for setting up the other prerequisites can be found in the [Openstack documentation](https://docs.openstack.org)


To set up a cluster:

1. Go to the Openstack instances page.

    ![](img/openstack_instances.png)

1. Click "Launch Instance", and the instance creation window will pop up.

1. Fill in the instance name, and leave the number of instances as 1, then click next.

    ![](img/openstack_instance_details.png)

1. Choose the desired image to use by clicking the up arrow at the end of its row. It will be displayed in the "Allocated" section when selected.

    ![](img/openstack_instance_source.png)

1. Choose the desired instance size by clicking the up arrow at the end of its row. It will be displayed in the "Allocated" section when selected.

    ![](img/openstack_instance_flavours.png)

1. Choose a network in the same way as an image or instance size. Note that **all nodes in a cluster must be on the same network**.

    ![](img/openstack_instance_network.png)

1. Choose a security group in the same way as an image or instance size. Note that **all nodes in a cluster must be in the same security group**.

    ![](img/openstack_instance_security.png)

1. Choose the keypair in the same way as an image or instance size.

    ![](img/openstack_instance_keypair.png)

1. In the "Configuration" section, there is a "Customisation Script" section with a text box. This will be used to set your [user data](../understand-solo/user-data.md)

    ![](img/openstack_instance_configuration.png)

1. When all options have been selected, press the "Launch Instance" button to launch. If the button is greyed out, then a mandatory setting has not been configured.

    ![](img/openstack_instance_ready.png)

1. Go to the "Instances" page in the "Compute" section. The created node should be there and be finishing or have finished creation.

    ![](img/openstack_associate_ip.png)


1. Click on the down arrow at the end of the instance row. This will bring up a drop-down menu.

1. Select "Associate Floating IP", this will make the ip management window pop up.

    ![](img/openstack_manage_ips.png)

1. Associate a floating IP, either by using an existing one or allocating a new one.

    1. To use an existing floating IP:

        1. Open the IP Address drop-down menu.

            ![](img/openstack_manage_ips_dropdown.png)

        1. Select one of the IP Addresses.

        1. Click "Associate" to finish associating an IP.

    1. To allocate a new floating IP:

        1. Click the "+" next to the drop-down arrow to open the allocation menu.

            ![](img/openstack_manage_ips_new.png)

        1. Click "Allocate IP".

1. Click "Associate" to finish associating an IP.
