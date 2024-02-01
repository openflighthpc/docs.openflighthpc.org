
When launching a login node it is worth considering what [user data](../understand-solo/user-data.md) options to provide. While it is not required, user data can provide powerful customisation at launch that can further streamline the cluster build process.

There are several options that can be added to change how a compute node will contact nodes on startup.

- Sharing public ssh key to clients: 
    - Instead of manually obtaining and sharing the root public SSH key (passwordless root ssh is required for [flight profile](../../flight-environment/use-flight/flight-admin-tools/profile.md)) this can be shared over the local network with `SHAREPUBKEY=true`
- Add an auth key:
    - Add the line `AUTH_KEY=<string>`. This means that the node will only accept incoming [flight hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md) nodes that provide a matching authorisation key

```yaml title="An example of all mentioned lines in a single cloud init script."
#cloud-config
write_files:
  - content: |
      SHAREPUBKEY=true
      AUTH_KEY=banana
    path: /opt/flight/cloudinit.in
    permissions: '0644'
    owner: root:root
  - content: |
      /opt/flight/bin/flight profile prepare openflight-kubernetes-multinode
    path: /var/lib/firstrun/scripts/00-prepare-profile.bash
    permissions: '0600'
    owner: root:root
```

!!! note
    The section that writes the `/var/lib/firstrun/scripts/00-prepare-profile.bash` file sets up the necessary dependencies for Kubernetes automatically when the login node is launched

!!! info
    More information on available user data options for Flight Solo via the [user data documentation](../understand-solo/user-data.md)
