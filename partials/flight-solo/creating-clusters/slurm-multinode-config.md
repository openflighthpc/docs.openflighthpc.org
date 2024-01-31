
1. Configure profile

    ```bash
    flight profile configure
    ```

    1. This brings up a UI, where several options need to be set. Use up and down arrow keys to scroll through options and enter to move to the next option. Options in brackets coloured yellow are the default options that will be applied if nothing is entered.
        - Cluster type: The type of cluster setup needed, in this case `Slurm Multinode`.
        - Cluster name: The name of the cluster.
        - Setup Multi User Environment with IPA?: Boolean value to determine whether to configure a multi-user environment with IPA. If set to true then the following will need to be filled in
            - IPA domain: The domain for the IPA server to use.
            - IPA secure admin password: The password to be used by the `admin` user of the IPA installation to manage the server.
        - Default user: The user that you log in with.
        - Set user password: Set a password to be used for the chosen default user.
        - IP or FQDN for Web Access: As described [here](../../flight-environment/use-flight/flight-web-suite/setup.md#setting-domain-name), this could be the public IP or public hostname.
        - IP range of compute nodes: The IP range of the compute nodes used, remember to add the netmask. E.g. `172.31.16.0/20`

1. Apply identities by running the command `flight profile apply`

    1. First apply an identity to the login node
        ```bash
        flight profile apply login1 login
        ```

    1. Wait for the login node identity to finish applying. You can check the status of all nodes with `flight profile list`.

        !!! tip
            You can watch the progress of the application with `flight profile view login1 --watch`

    1. Apply an identity to the each of the compute nodes (in this example, genders-style syntax is used to apply to `node01` and `node02`) 
        ```bash
        flight profile apply node[01-02] compute
        ```

        !!! tip
            You can check all available identities for the current profile with `flight profile identities`

!!! success
    Congratulations, you've now created a SLURM Multinode environment! Learn more about SLURM in [the HPC Environment docs](../../hpc-environment-basics/hpc-usage/slurm/index.md).
