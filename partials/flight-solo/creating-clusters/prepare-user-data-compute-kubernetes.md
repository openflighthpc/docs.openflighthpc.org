
Setting up compute nodes is done slightly differently than a login node. The basic steps are the same except subnets, networks and security groups need to match the ones used for the login node.

This is the smallest amount of cloud init data necessary. It allows the login node to find the compute nodes as long as they are on the same network, and ssh into them from the root user (which is necessary for setup).
```yaml
#cloud-config
users:
  - default
  - name: root
    ssh_authorized_keys:
      - <Content of ~/.ssh/id_alcescluster.pub from root user on login node>
```

!!! tip
    The above is not required if the [`SHAREPUBKEY`](../understand-solo/user-data.md#sharepubkey) option was provided to the login node. If this was the case then the [`SERVER`](../understand-solo/user-data.md#server) option provided to the compute node will be enough to enable root access from the login node.

There are several options that can be added to change how a compute node will contact nodes on startup.

- Sending to a specific server:
    - Instead of broadcasting across a range, add the line `SERVER=<private server IP>` to send to specifically that node, which would be your login node.
- Add an auth key:
    - Add the line `AUTH_KEY=<string>`. This means that the compute node will send it's [flight hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md) packet with this key. **This must match the auth key provided to your login node**

```yaml title="An example of all mentioned lines in a single cloud init script."
#cloud-config
write_files:
  - content: |
      SERVER=10.10.0.1
      AUTH_KEY=banana
    path: /opt/flight/cloudinit.in
    permissions: '0644'
    owner: root:root
  - content: |
      /opt/flight/bin/flight profile prepare openflight-kubernetes-multinode
    path: /var/lib/firstrun/scripts/00-prepare-profile.bash
    permissions: '0600'
    owner: root:root
users:
  - default
  - name: root
    ssh_authorized_keys:
      - <Content of ~/.ssh/id_alcescluster.pub from root user on login node>
```

!!! note
    The section that writes the `/var/lib/firstrun/scripts/00-prepare-profile.bash` file sets up the necessary dependencies for Kubernetes automatically when the compute node is launched

!!! info
    More information on available user data options for Flight Solo via the [user data documentation](../understand-solo/user-data.md)
