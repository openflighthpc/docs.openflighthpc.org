
To set up a cluster, you will need to [import a Flight Solo image](../get-solo/index.md).

1. Go to the Microsoft [Azure portal](https://portal.azure.com/#home).

    ![](img/azure_portal.png)

1. Go to **Virtual Machines**, and click "Create".

    ![](img/azure_vms.png)

1. Select "Azure virtual machine", which will load this page:

    ![](img/azure_createvm_basics.png)

1. On the Basics page:

    1. Set *Subscription* to your subscription type.
    1. Set *Resource Group* to your desired resource group (where the vm will be kept after creation).
    1. Set *Virtual machine name* to any suitable name. (`-` does not work in a name)
    1. Set *Image* to the imported Flight Solo Image.
        1. It may be necessary to open the dropdown and/or see all images in order to find the imported image.
            ![](img/azure_createvm_image_dropdown.png)
        1. Scroll down to see more options
            ![](img/azure_createvm_basics2.png)
    1. Set *Size* to your choice of size.
    1. Set *Authentication type* to `SSH public key`
    1. Set *Username* to any suitable username.
    1. Set *SSH public key source* to the most suitable option, but remember what key was used if creating compute nodes later.
    1. Fill in the *Key pair name/Stored key/Use existing key* as appropriate to the chosen public key source.
    1. Allow traffic to selected ports, and select `SSH(22)`, `HTTP(80)` and `HTTPS(443)` as the allowed ports.
    1. Set the most appropriate license type.

1. Continuing on to the next page, *Disks*, all necessary details should already be filled out, so this page can be skipped (unless you know what you want to change). However, it is recommended to select *Delete with VM*.

    ![](img/azure_createvm_disks.png)

1. Go on to the networking tab and fill out the necessary options.

    ![](img/azure_createvm_networking.png)

    1. Set *Virtual Network* or create a new one by pressing "Create new" and setting a name. **Remember what this is for if you create compute nodes.**
    1. Set *Subnet* to one of the options in the dropdown menu, if it isn't already set. **Remember what this is for if you create compute nodes.**
    1. Set *Public IP* to an existing public IP or create a new one by pressing "Create new" and setting a name.
    1. Set *NIC network security group* to "Advanced", and press "Create new" to create a new security group.
        ![](img/azure_createvm_networking_newsg.png)
        1. Click on "Add an inbound rule" to open the inbound rule creator
            ![](img/azure_createvm_networking_newsg_createinbound.png)
        1. Create rules to allow `HTTP`, `HTTPS` and `SSH` traffic from your IP address to the security group.
        1. When complete, press "OK" at the bottom left of the screen to return to image creation.

1. The *Management*, *Monitoring* and *Tags* tabs have more options that aren't necessary for setup. Skip to the tab *Advanced*

1. In the *Custom data and cloud init* section, there is a text box. This is where your [user data](../understand-solo/user-data.md) can be specified

    ![](img/azure_createvm_advanced_customdata.png)

1. Azure will take some time to review your settings. If there are no issues click "Create" to finish creation.
