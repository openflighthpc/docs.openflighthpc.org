# Importing Flight Solo Image to Azure 

## Prepare Azure Account 

### Prerequisites

1. Start by installing the [Azure Command Line Interface(CLI)](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli), as using it is the simplest way to import a raw image. Alternatively you can follow these instructions using the [Azure Cloud Shell](https://learn.microsoft.com/en-us/azure/cloud-shell/overview).

### Create Storage Account


1. Create a resource group for the storage account
    ```bash
    az resource group create MY_RESOURCE_GROUP_NAME
    ```

1. Create a storage account
    ```bash
    az storage account create --name "MY_STORAGE_ACCOUNT_NAME" --resource-group "MY_RESOURCE_GROUP_NAME"
    ```

1. Create a storage container 
    ```bash
    az storage container create --name "MY_CONTAINER_NAME" --account-name "MY_STORAGE_ACCOUNT_NAME" --resource-group "MY_RESOURCE_GROUP_NAME"
    ```

## Import Image

1. Download the Flight Solo Azure image [here](https://repo.openflighthpc.org/?prefix=images/FlightSolo/)
1. Upload the raw Flight Solo image as a storage blob to the container
    ```bash
    az storage blob upload --account-name "MY_STORAGE_ACCOUNT_NAME" \
                           --container-name "MY_CONTAINER_NAME" \
                           --type page \
                           --file Flight_Solo_VERSION_azure.raw \
                           --name Flight-Solo_VERSION_azure.vhd
    ```

1. Finally, create an Azure image from the storage blob (Make sure to get the correct source from the uploaded storage blob)
    ```
    az image create --resource-group "MY_RESOURCE_GROUP_NAME" \
        --name Flight_Solo_VERSION_azure \
        --os-type Linux \
        --hyper-v-generation V2 \
        --source  https://MY_STORAGE_ACCOUNT_NAME.blob.core.windows.net/MY_CONTAINER_NAME/Flight_Solo_VERSION_azure.vhd
    ```

## Changing regions

The storage blob will be placed in the region of the storage account and container it is created in, and an image made from it must go into a resource group with the same region.

In case this region is the wrong one, it can be changed after the image is created:

1. Install the Azure CLI image copy extension.
    ```bash
    az extension add --name image-copy-extension
    ```

1. Set the options for source and target resource group, regions and source image.
    ```bash
    az image copy --source-resource-group "MY_RESOURCE_GROUP_NAME"
                  --source-object-name "Flight_Solo_VERSION_azure" \
                  --target-location "uksouth" "westeurope" \
                  --target-resource-group "MY_RESOURCE_GROUP_NAME" \
                  --cleanup
    ```

1. After a short wait, the source image will have the name `SOURCE_OBJECT_NAME-region` and be in the target resource group

