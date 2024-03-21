# Launch Core Infrastructure (SLURM)

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star-outline: :material-star-outline: :material-star-outline: :material-star-outline:
</div>

The core infrastructure relates to the concepts described in the [HPC Concepts section](../../../../hpc-concepts/infrastructure.md) whereby a section of dedicated services creates the framework for the cluster. Compute nodes can then be connected to the services in this infrastructure to provide resources for workload execution.

Depending on your requirements and use case you may want a different size of core infrastructure. This documentation covers the following sizes:

- **Small:** A lightweight infrastructure system that provides all the services, useful for prototyping and testing
- **Medium:** Multiple small systems dedicating resources to various services (e.g. NFS storage), this provides greater performance than the **Small** infrastructure and supports more compute nodes
- **Large:** A resilient infrastructure that provides a framework for scaling up to multiple queues, many compute nodes and a long-running HPC ecosystem

All of the above will prepare the system automatically for running a SLURM cluster with multiple compute nodes on a single queue. 

## Create Core Infrastructure 

=== "Small"

    [Download Small Core Infra Template](templates/core-infra-small.yml){ :download .md-button }

    1. Login to your Concertim Cloud account via CLI 
    1. Download the above template to your account on Concertim Cloud 
    1. Source your OpenStack settings file
        ```bash
        $ source ~/openrc
        ```
    1. Launch the template (replace `MYKEYPAIRNAME` with the name of your Concertim Cloud key-pair, optionally replace `mycluster1` with your desired cluster name) 
        ```bash
        $ openstack stack create -t core-infra-small.yml \
                --parameter key-name=MYKEYPAIRNAME \
                --parameter clustername=mycluster1 \
                "mycluster1-coreinfra" --wait
        ```
    1. Once completed, you can get the IP to access the login node with the following command (the floating IP is the one on the `10.199` network):
        ```bash
        $ openstack server show login1.mycluster1.alces.network -c addresses
        +-----------+-----------------------------------------------+
        | Field     | Value                                         |
        +-----------+-----------------------------------------------+
        | addresses | mycluster1-network=10.100.0.101, 10.199.31.20 |
        +-----------+-----------------------------------------------+
        ```
        
        !!! note
            It will take around 3-5 minutes for the system to launch

    1. Log in to the login node
        ```bash
        $ ssh flight@10.199.31.20
        ```

    The template will automatically configure `login1` as a SLURM controller, NFS server and provide web access to the cluster with [Flight User Suite](../../../../flight-environment/use-flight/flight-web-suite/index.md) (accessible via the floating IP in a web browser when connected to the [Concertim Cloud VPN](http://alces-cloud-docs.alces-flight.com/latest/docs/starter/access/#secure-vpn))

=== "Medium"

    [Download Medium Core Infra Template](templates/core-infra-medium.yml){ :download .md-button }

    1. Login to your Concertim Cloud account via CLI 
    1. Download the above template to your account on Concertim Cloud 
    1. Source your OpenStack settings file
        ```bash
        $ source ~/openrc
        ```
    1. Launch the template (replace `MYKEYPAIRNAME` with the name of your Concertim Cloud key-pair, optionally replace `mycluster1` with your desired cluster name) 
        ```bash
        $ openstack stack create -t core-infra-medium.yml \
                --parameter key-name=MYKEYPAIRNAME \
                --parameter clustername=mycluster1 \
                "mycluster1-coreinfra" --wait
        ```
    1. Once completed, you can get the IP to access the login node with the following command (the floating IP is the one on the `10.199` network):
        ```bash
        $ openstack server show login1.mycluster1.alces.network -c addresses
        +-----------+-----------------------------------------------+
        | Field     | Value                                         |
        +-----------+-----------------------------------------------+
        | addresses | mycluster1-network=10.100.0.101, 10.199.31.20 |
        +-----------+-----------------------------------------------+
        ```
        
        !!! note
            It will take around 3-5 minutes for the system to launch

    1. Log in to the login node
        ```bash
        $ ssh flight@10.199.31.20
        ```

    The template will automatically configure `login1` as a SLURM controller and web access to the cluster with [Flight User Suite](../../../../flight-environment/use-flight/flight-web-suite/index.md) (accessible via the floating IP in a web browser when connected to the [Concertim Cloud VPN](http://alces-cloud-docs.alces-flight.com/latest/docs/starter/access/#secure-vpn)). Additionally `nfs01` will be the NFS server sharing default mounts from a 500GB storage disk and `infra01` will be an IPA server for user management. 

=== "Large" 

    [Download Large Core Infra Template](templates/core-infra-large.yml){ :download .md-button }

