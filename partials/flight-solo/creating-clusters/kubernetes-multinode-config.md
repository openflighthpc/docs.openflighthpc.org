
1. Configure profile

    ```bash
    flight profile configure
    ```
    1. This brings up a UI, where several options need to be set. Use up and down arrow keys to scroll through options and enter to move to the next option. Options in brackets coloured yellow are the default options that will be applied if nothing is entered.
        - Cluster type: The type of cluster setup needed, in this case `Openflight Kubernetes Multinode`.
        - Cluster name: The name of the cluster.
        - Default user: The user that you log in with.
        - IP range of compute nodes: The IP range of the compute nodes used, remember to add the netmask. E.g. `172.31.16.0/20`
        - IP range of Kubernetes pods: The IP range that the kubernetes pods should use, make sure this is different from the IP range of the compute nodes, and remember to add the net mask. E.g. `192.168.0.0/16`

7. Apply identities by running the command `flight profile apply`
    1. First apply an identity to the login node
        ```bash
        flight profile apply login1 master
        ```
    1. Wait for the login node identity to finish applying. You can check the status of all nodes with `flight profile list`.

        !!! tip
            You can watch the progress of the application with `flight profile view login1 --watch`

    1. Apply an identity to the each of the compute nodes.  E.g.
        ```bash
        flight profile apply node01,node02 worker
        ```

        !!! tip
            You can check all available identities for the current profile with `flight profile identities`

!!! success
    Congratulations, you've now created a Kubernetes Multinode environment! Learn more about Kubernetes in [their documentation](https://kubernetes.io/docs/home/).

