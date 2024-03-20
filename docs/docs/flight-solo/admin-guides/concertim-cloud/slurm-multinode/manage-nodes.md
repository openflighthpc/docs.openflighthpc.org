# Manage Nodes 

When building a cluster there will come times where the compute resource will need to evolve with the workload requirements. This could be to add resources, reduce the available resources to save costs or to resize resources to gain performance improvements. 

## Add Node

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star-outline: :material-star-outline: :material-star-outline: :material-star-outline:
</div>

To add to the [SLURM Core Infrastructure](launch-core-infra.md) there are templates available for 2 different kinds of compute nodes - small and large. These can be downloaded below:

[Download Small Compute Node Template](templates/generic-compute-small.yml){ :download .md-button }

[Download Large Compute Node Template](templates/generic-compute-large.yml){ :download .md-button }

These templates can be quickly launched through the CLI to add new compute nodes to the cluster. 

For example, to launch a small compute node that's the first for a cluster, run the following from the Concertim Cloud CLI: 
```bash
$ openstack stack create -t generic-compute-small.yml \
        --parameter node-number=1 \
        --parameter clustername=mycluster1 \
        "mycluster1-node1" --wait
```

Where:

- `node-number` is the number of the node, this shouldn't be padded at all (e.g. `01`) as the template handles this (so `1` becomes `001`) 
- `clustername` is the name of the cluster, matching that specified for the core infrastructure

Once launched the node will take a couple of minutes to boot before automatically joining the cluster and provisioning itself as a compute node. The progress if this can be checked with `flight profile list`. 

For more information on checking the progress, see the documentation for [Flight Profile](../../../../flight-environment/use-flight/flight-admin-tools/profile.md)

## Remove Node

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star-outline: :material-star-outline: :material-star-outline: :material-star-outline:
</div>

To remove a compute node from a cluster:

- Shut it down from the Concertim Cloud CLI
    ```bash
    $ openstack server stop node001.mycluster1.alces.network
    ```
- Wait for the node to turn off

There are triggers in place (from the core infrastructure template) that will perform the necessary tasks to remove the node from the SLURM queue.

Once the node has completely shut down (`openstack server show node001.mycluster1.alces.network -c status` shows `SHUTOFF`) you are safe to terminate the node to free up resources.

## Resize Node 

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star-outline: :material-star-outline: :material-star-outline: :material-star-outline:
</div>

To resize a node:

- Drain the node on the SLURM queue (as `root` on the `login1` node of the core infrastructure)
    ```bash
    $ scontrol update NodeName=node001 State=DRAIN Reason="For Resize"
    ```
- Ensure that no jobs or active processes are running on the node
- Perform the resize action from the Concertim Cloud CLI. For example, to resize `node001` in `mycluster1` from a `c1.small` to a `c1.large` with the CLI
    ```bash
    $ openstack server resize --flavor c1.large node001.mycluster1.alces.network --wait
    ```

    !!! warning
        This will shut down the compute node and remove it from the cluster. Only perform this action when you are sure that it is free to be turned off

- Once the resize has completed, confirm with the following
    ```bash
    $ openstack server resize confirm node001.mycluster1.alces.network
    ```
- After a few minutes the node will come back up and rejoin the cluster with it's new resources shown in SLURM
