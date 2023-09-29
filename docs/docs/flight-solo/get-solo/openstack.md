# Import Flight Solo Image to OpenStack

## Prepare for Image Import 

### CLI Prerequisites

1. To set this up, you will need to install the [OpenStack CLI](https://docs.openstack.org/newton/user-guide/common/cli-install-openstack-command-line-clients.html)
1. As well as the CLI, you will need your [OpenStack RC file](https://docs.openstack.org/newton/user-guide/common/cli-set-environment-variables-using-openstack-rc.html)

## Upload Image

1. Download the Flight Solo OpenStack image [here](https://repo.openflighthpc.org/?prefix=images/FlightSolo/)
1. Upload the image
    ```bash
    openstack image save --format raw --min-disk 10 --min-ram 2048 --file /path/to/Flight_Solo_VERSION_generic-cloudinit.raw Flight_Solo_VERSION_generic-cloudinit
    ```

