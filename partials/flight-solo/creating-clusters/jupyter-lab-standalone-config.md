
1. Configure profile

    ```bash
    flight profile configure
    ```

    1. This brings up a UI, where several options need to be set. Use up and down arrow keys to scroll through options and enter to move to the next option. Options in brackets coloured yellow are the default options that will be applied if nothing is entered.
        - Cluster type: The type of cluster setup needed, in this case select `Jupyter Standalone`.
        - Cluster name: The name of the cluster.
        - Default user: The user that you log in with.
        - Set user password: Set a password to be used for the chosen default user.
        - IP or FQDN for Web Access: As described [here](../../flight-environment/use-flight/flight-web-suite/setup.md#setting-domain-name), this could be the public IP or public hostname.

6. Apply an identity by running the command `flight profile apply`, E.g.
    ```bash
    flight profile apply standalone1 all-in-one
    ```
    !!! tip
    You can check all available identities for the current profile with `flight profile identities`

7. Wait for the identity to finish applying. You can check the status of all nodes with `flight profile list`.

    !!! tip
        You can watch the progress of the application with `flight profile view login1 --watch`

!!! success
    Congratulations, you've now created a Jupyter Lab Standalone environment! Learn more about Kubernetes in [their documentation](https://jupyterlab.readthedocs.io/en/stable/index.html).
