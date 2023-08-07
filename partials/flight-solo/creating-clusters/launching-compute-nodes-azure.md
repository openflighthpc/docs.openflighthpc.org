
1. Go to the Microsoft [Azure portal](https://portal.azure.com/#home).

    ![](img/azure_portal.png)

1. Go to **Virtual Machines**, and click "Create".

    ![](img/azure_vms.png)

1. Select "Azure virtual machine", which will load this page:

    ![](img/azure_createvm_basics.png)

1. On the Basics page:

    1. Set *Subscription* to your subscription type.
    1. Set *Resource Group* to the **same as the login node** 
    1. Set *Virtual machine name* to any suitable name.
    1. Set *Image* to the imported Flight Solo Image.
        1. It may be necessary to open the dropdown and/or see all images in order to find the imported image.
            ![](img/azure_createvm_image_dropdown.png)
        1. Scroll down to see more options
            ![](img/azure_createvm_basics2.png)
    1. Set *Size* to your choice of size.
    1. Set *Authentication type* to `SSH public key`
    1. Set *Username* to the **same username as with the login node.**
    1. Set *SSH public key source* to the **same key that was used for the login node.**
    1. Fill in the *Key pair name/Stored key/Use existing key* as appropriate to the chosen public key source.
    1. Allow traffic to selected ports, and select `SSH(22`, `HTTP(80)` and `HTTPS(443)` as the allowed ports.
    1. Set the most appropriate license type.

1. Continuing on to the next page, *Disks*, all necessary details should already be filled out, so this page can be skipped (unless you know what you want to change). However, it is recommended to select *Delete with VM*.

    ![](img/azure_createvm_disks.png)

1. Go on to the networking tab and fill out the necessary options.

    1. Set *Virtual Network* to the **same network that was used for the login node.**
    1. Set *Subnet* to the **same subnet that was used for the login node.**
    1. Set *NIC network security group* to the **same subnet that was used for login node.**
    1. When complete, press "OK" at the bottom left of the screen to return to image creation.

1. The *Management* and *Monitoring* tabs have more options that aren't necessary for setup. Skip to the *Advanced* tab.

    ![](img/azure_createvm_advanced.png)

1. In the *Custom data and cloud init* section, there is a text box. Write a cloud init script as prepared earlier in the custom data section

    ![](img/azure_createvm_advanced_customdata.png)

1. Skip to the *Review + Create* section. Azure will take some time to review your settings. If there are no issues click "Create" to finish creation.

