# Import Flight Solo Image to Concertim Cloud

## Prepare for Image Import 

### Prerequisites

1. To set this up, you will need access to the [Concertim Cloud platform](https://alces-cloud-docs.alces-flight.com/starter/)

## Upload Image

1. Login to your Concertim Cloud account
1. Download the Flight Solo OpenStack image [here](https://repo.openflighthpc.org/?prefix=images/FlightSolo/) (example command below, replace `VERSION` with the desired version of Flight Solo)
    ```bash
    wget https://repo.openflighthpc.org/images/FlightSolo/VERSION/Flight_Solo_VERSION_generic-cloudinit.raw
    ```
1. Source your account OpenStack settings file
    ```bash
    source ~/openrc
    ```
1. Upload the image (example command below, replace `VERSION` with the desired version of Flight Solo)
    ```bash
    openstack image create --disk-format raw --min-disk 10 --min-ram 2048 --file Flight_Solo_VERSION_generic-cloudinit.raw "Flight Solo VERSION"
    ```

