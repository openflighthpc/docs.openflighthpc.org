
1. Launch a compute node with a command similar to the following: 

    ```bash
    $ openstack server create --flavor p1.small \
                              --image "Flight Solo VERSION" \
                              --boot-from-volume 10 \
                              --network "mycluster1-network" \
                              --key-name "MyKey" \
                              --security-group "mycluster1-sg" \
                              --user-data myuserdata.yml \
                              --min 2 \
                              --max 2 \
                              node
    ```

    - Where:

        - `flavor` - Is the desired size of the instance
        - `image` - Is the Flight Solo image imported to Alces Cloud
        - `boot-from-volume` - Is the size of the system disk in GB
        - `network` - Is the name or ID of the network created for the cluster
        - `key-name` - Is the name of the SSH key to use
        - `security-group` - Is the name or ID of the security group created previously
        - `user-data` - Is the file containing cloud-init user-data 
        - `min` and `max` - Is the number of nodes to launch
        - `node` - Is the name of the deployment to have numbers appended to (e.g. this example creates `node-1` and `node-2`)

Further detail on collecting the information from the above can be found in the [Alces Cloud documentation](https://alces-cloud-docs.alces-flight.com/starter/instance/).
