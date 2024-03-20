# Manage SLURM Queues

The default behavior of the SLURM multinode environment is to add any new compute nodes to the "all" queue. In some situations an admin may want to separate queues for differing workloads or teams. This guide covers multiple methods for rolling out changes to the SLURM configuration file across the cluster.

## Option 1: Update SLURM Configuration Template

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star: :material-star-outline: :material-star-outline: :material-star-outline:
</div>

This is the **recommended** route for modifying the SLURM configuration file because it: 

- Ensures changes remain when nodes are added to, or removed from, the cluster
- Assists with node resource definitions, leaving the configuration of partitions up to the admin 
    - The line ``{{ '{{ nodeinfo |join(\"\\n\") }}' }}`` in the template renders information collected during the Flight Profile apply process on all compute nodes into `slurm.conf`

The `slurm.conf` template is located at `/opt/flight/usr/lib/profile/types/openflight-slurm-multinode/run_env/openflight-slurm-multinode/roles/slurm/templates/slurm.conf`. 

An example of changing the queue setup in a cluster that has 2 compute nodes added 

1. Open `slurm.conf` template mentioned above for editing
    1. Remove the following line
        ```
        PartitionName=all Nodes=ALL Default=YES MaxTime=UNLIMITED
        ```
    1. Add new partitions, specifying the existing compute nodes
        ```
        PartitionName=odds Nodes=node001 MaxTime=UNLIMITED Default=YES
        PartitionName=evens Nodes=node002 MaxTime=UNLIMITED
        ```
1. Reapply to an existing compute node for changes to propagate and for SLURM to be safely reloaded
    ```bash
    $ flight profile apply node001 compute --force
    ```

!!! warning 
    If partitions with nodes have been manually specified (like in the above example) then nodes which are to be removed/resized will need to be removed from any partitions in the template before proceeding with removing/resizing otherwise `flight-slurmctld` service on `login1` will likely fail to reload.

## Option 2: Override SLURM Template with Hard-coded Configuration File

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star: :material-star: :material-star-outline: :material-star-outline:
</div>

An alternative method to modifying the template which gets rendered for SLURM queues is to provide an override configuration file.

1. Create override `slurm.conf` at `/opt/flight/usr/lib/profile/types/openflight-slurm-multinode/run_env/openflight-slurm-multinode/files/CLUSTERNAME_slurm.conf`
    1. `CLUSTERNAME` is the one provided to the core infrastructure when created (e.g. `mycluster1`) 
1. Reapply to an existing compute node for changes to propagate and for SLURM to be safely reloaded
    ```bash
    $ flight profile apply node001 compute --force
    ```

!!! warning 
    This method may cause SLURM to fail to start on any nodes which are subsequently added to the queue if they are not added to the override file _before_ the node is created. In the event that the node fails to complete it's Flight Profile identity setup then the `slurm.conf` override file will need to be modified to ensure it's correct and the Flight Profile identity will need to be force applied

## Option 3: Edit In-Place

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star: :material-star: :material-star: :material-star-outline:
</div>

!!! danger
    Editing SLURM files in-place is temporary if any changes are made to the system using Flight Profile (e.g. compute nodes being added/removed/resized, new storage servers being added) so this method is **not recommended** on clusters that may change over time

This method is not recommended but experienced admins running a cluster that they don't expect to change (e.g. add/remove/resize nodes) can manage SLURM in a more traditional method by editing the SLURM config file directly and reloading the service. 

1. Modify `/opt/flight/opt/slurm/etc/slurm.conf` on the login node
1. Copy the new `/opt/flight/opt/slurm/etc/slurm.conf` to all the compute nodes
1. Reload the SLURM configuration on the cluster (from the login node as `root`) 
    ```bash
    $ scontrol reconfigure
    ```
