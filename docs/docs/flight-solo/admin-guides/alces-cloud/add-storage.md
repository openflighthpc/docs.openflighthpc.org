# Add a Storage Node

Following this guide will add a `c1.small` instance with a 500GB storage disk mounted to `/export` which will share directories over NFS with the rest of the cluster.

[Download Storage Node Template](templates/storage.yml){ :download .md-button }

1. Create storage node from Alces Cloud CLI 
    ```bash
    $ openstack stack create -t storage.yml \
            --parameter storage-number=1 \
            --parameter storage-size=500 \
            --parameter clustername=mycluster1 \
            "mycluster1-storage1" --wait
    ```

    - Where:

        - `node-number` is the number of the node, this shouldn't be padded at all (e.g. `01`) as the template handles this (so `1` becomes `001`)
        - `clustername` is the name of the cluster, matching that specified for the core infrastructure

1. Wait 3-5 minutes for the system to boot
1. The node should appear in the `hunter` list when available
    ```bash
    $ flight hunter list 
    ```
1. Add desired mounts on the storage node to the NFS configuration file within the `nfs_shares` dictionary by opening `/opt/flight/usr/lib/profile/types/openflight-slurm-multinode/run_env/openflight-slurm-multinode/roles/nfs/vars/main.yml` for editing as `root`
    ```bash
    examplemnt:
      server: "storage01"
      export: "/export/examplemnt"
      mountpoint: "/opt/examplemnt"
      export_permissions: "0774"
      export_opts: "{{ compute_ip_range }}(rw,no_root_squash,sync)"
      mount_opts: intr,rsize=32768,wsize=32768,vers=3,_netdev,nofail
    ```

    - Where: 

        - `examplemnt:` is a unique key for identifying the mount
        - `server` is the hostname of the newly created storage server
        - `export` is the path to the directory to be shared from the storage server 

            !!! tip
                The 500GB storage disk is mounted to `/export/` on the storage node so setting the `export` to a directory under `/export` will ensure the storage disk is being used for the NFS export.

        - `mountpoint` is the location on clients for the directory to mount the export to
        - `export_permissions` is the mode of the export directory 
        - `mount_opts` are the NFS mount options for clients to use 
        - `export_opts` (OPTIONAL) is the subnet range and export options for the directory, in the example above the `{{ compute_ip_range }}` translates to the subnet that the cluster resides on (this can be seen in the [Flight Profile](../../../flight-environment/use-flight/flight-admin-tools/profile.md) configuration)
        - `export_owner` (OPTIONAL) is the username to own the export directory (giving them ownership permissions on client mounts)
        - `export_group` (OPTIONAL) is the group to own the export directory

1. Apply the `storage` identity to the new node 
    ```bash
    flight profile apply storage01 storage
    ```
1. Once complete, the new NFS shares added to the file will be available on the login node and any existing compute nodes. Any new compute nodes will also add this mount.

