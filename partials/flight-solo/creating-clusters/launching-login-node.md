## Launch Login Node

Whether creating a standalone or multinode cluster, you will need a login node. Choose the platform you want to use and go through the instructions.

=== ":fontawesome-brands-aws: AWS Marketplace"

    {% include 'flight-solo/creating-clusters/launching-login-node-awsmarketplace.md' %}

=== ":fontawesome-brands-aws: AWS Imported"

    {% include 'flight-solo/creating-clusters/launching-login-node-awsimported.md' %}

=== "Openstack"

    Before setting up a cluster on Openstack, there are several required prerequisites:
    - A flight solo image imported to openstack
    - The following set up on Openstack:
        - Your own keypair
        - A network
        - A router
        - A security group that allows traffic through ports 22, 80, 8888, 443 and 5900-5903

    This documentation includes instructions for [importing an image to Openstack](/cluster_build_methods/get_flight_solo/openstack_setup_solo/), and guides for setting up the other prerequisites can be found in the [Openstack documentation](https://docs.openstack.org/zed/)


    To set up a cluster:

    1. Go to the Openstack instances page.

    ![](/images/openstack_instances.png)

    2. Click "Launch Instance", and the instance creation window will pop up.

    3. Fill in the instance name, and leave the number of instances as 1, then click next.

    ![](/images/openstack_instance_details.png)

    4. Choose the desired image to use by clicking the up arrow at the end of its row. It will be displayed in the "Allocated" section when selected.

    ![](/images/openstack_instance_source.png)

    5. Choose the desired instance size by clicking the up arrow at the end of its row. It will be displayed in the "Allocated" section when selected.

    ![](/images/openstack_instance_flavours.png)

    6. Choose a network in the same way as an image or instance size. Note that **all nodes in a cluster must be on the same network**.

    ![](/images/openstack_instance_network.png)

    7. Choose a security group in the same way as an image or instance size. Note that **all nodes in a cluster must be in the same security group**.

    ![](/images/openstack_instance_security.png)

    8. Choose the keypair in the same way as an image or instance size.

    ![](/images/openstack_instance_keypair.png)


    9. When all options have been selected, press the "Launch Instance" button to launch. If the button is greyed out, then a mandatory setting has not been configured.

    ![](/images/openstack_instance_ready.png)

    10. Go to the "Instances" page in the "Compute" section. The created node should be there and be finishing or have finished creation.

    ![](/images/openstack_associate_ip.png)


    11. Click on the down arrow at the end of the instance row. This will bring up a drop down menu.

    12. Select "Associate Floating IP", this will make the ip management window pop up.

    ![](/images/openstack_manage_ips.png)

    13. Associate a floating IP, either by using an existing one or allocating a new one.

    ### To use an existing floating IP:

    14. Open the IP Address drop down menu.

    ![](/images/openstack_manage_ips_dropdown.png)

    15. Select one of the IP Addresses.

    16. Click "Associate" to finish associating an IP.

    ### To allocate a new floating IP:

    14. Click the "+" next to the dropdown arrow to open the allocation menu.

    ![](/images/openstack_manage_ips_new.png)

    15. Click "Allocate IP".

    !!! note
    
        If all available IPs have already been allocated, use an existing one instead.

    16. Click "Associate" to finish associating an IP.

=== "Azure"

    To set up a cluster, you will need to first [import a Flight Solo image](/cluster_build_methods/get_flight_solo/import_solo_azure/).

    1. Go to the Microsoft [Azure portal](https://portal.azure.com/#home).

    ![](/images/azure_portal.png)

    2. Go to **Virtual Machines**, and click "Create".

    ![](/images/azure_vms.png)

    3. Select "Azure virtual machine", which will load this page:

    ![](/images/azure_createvm_basics.png)

    4. On the Basics page:
        - Set *Subscription* to your subscription type.
        - Set *Resource Group* to your desired resource group (where the vm will be kept after creation).
        - Set *Virtual machine name* to any suitable name. (`-` does not work in a name)
        - Set *Image* to the imported Flight Solo Image.
            It may be necessary to open the dropdown and/or see all images in order to find the imported image.
    ![](/images/azure_createvm_image_dropdown.png)
        Scroll down to see more options
    ![](/images/azure_createvm_basics2.png)
        - Set *Size* to your choice of size.
        - Set *Authentication type* to `SSH public key`
        - Set *Username* to any suitable username.
        - Set *SSH public key source* to the most suitable option, but remember what key was used if creating compute nodes later.
        - Fill in the *Key pair name/Stored key/Use existing key* as appropriate to the chosen public key source.
        - Allow traffic to selected ports, and select `SSH(22)`, `HTTP(80)` and `HTTPS(443)` as the allowed ports.
        - Set the most appropriate license type.
    5. Continuing on to the next page, *Disks*, all necessary details should already be filled out, so this page can be skipped (unless you know what you want to change). However, it is recommended to select *Delete with VM*.

    ![](/images/azure_createvm_disks.png)

    6. Go on to the networking tab and fill out the necessary options.
    ![](/images/azure_createvm_networking.png)
        - Set *Virtual Network* or create a new one by pressing "Create new" and setting a name. **Remember what this is for if you create compute nodes.**
        - Set *Subnet* to one of the options in the dropdown menu, if it isn't already set. **Remember what this is for if you create compute nodes.**
        - Set *Public IP* to an existing public IP or create a new one by pressing "Create new" and setting a name.
        - Set *NIC network security group* to "Advanced", and press "Create new" to create a new security group.
    ![](/images/azure_createvm_networking_newsg.png)
            - Click on "Add an inbound rule" to open the inbound rule creator
    ![](/images/azure_createvm_networking_newsg_createinbound.png)
            - Create rules to allow `HTTP`, `HTTPS` and `SSH` traffic from your IP address to the security group.
            - When complete, press "OK" at the bottom left of the screen to return to image creation.

    7. The *Management*, *Monitoring*, *Advanced*, and *Tags* tabs have more options that aren't necessary for setup. Skip to the final tab *Review + create*

    8. Azure will take some time to review your settings. If there are no issues click "Create" to finish creation.
