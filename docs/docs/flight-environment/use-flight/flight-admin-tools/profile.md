# Flight Profile

Flight profile is a tool that manages the profiles of cluster nodes. In this context, a profile is a cluster type (e.g. SLURM, Kubernetes, Jupyter Lab), and the different types of nodes are identities. For example, a profile might be `slurm multinode`, and the identities would be `login` and `compute`. This page covers the sub-commands of `flight profile`, which are run in the format `flight profile <sub-command> --<option>`.

## Using Flight Profile

Generally speaking, the process of utilising Flight Profile is to:

- Prepare the type you wish to use

    !!! info
        The type you wish to use will need to be prepared on all nodes that are to be included in the cluster, this is because the preparation process installs the required dependencies for the cluster type for the current system only

- Run through the configure prompt to customise the type
- Apply identities from within the profile to hosts

The various commands of Flight profile are described in further detail below.

### `configure`

When `flight profile configure` is run, the user will be guided through a series of questions that need to be answered to properly configure the cluster. There are too many questions to cover them all here, but the [cluster build methods](../../../flight-solo/cluster-build-methods/index.md) section has more information about specific clusters.

- `--reset-type` - After a cluster type has been chosen, it will be locked in when `configure` is run in the future. This argument allows the user to reset and select a different cluster type.
- `--show` - Shows the answers for the current configuration.
- `--accept-defaults` - When using `--answers`, take the default values for any answers not given.
- `--answers` - Pass json text as the answers instead of using the menu. This could be done either by pasting text or passing the contents of a file (e.g. `flight profile configure --answers "$(cat /path/file.json)"` ). Below are some examples of what the json could look like be:

    === "Slurm Standalone"
        ```json
        {
          "cluster_type": "openflight-slurm-standalone",
          "cluster_name": "my-cluster",
          "default_username": "flight",
          "default_password": "0penfl1ght",
          "access_host": "51.104.217.61"
        }
        ```
    === "Slurm Multinode"
        ```json
        {
          "cluster_type": "openflight-slurm-multinode",
          "cluster_name": "my-cluster",
          "ipa_use": "false",
          "default_username": "flight",
          "default_password": "0penfl1ght",
          "access_host": "51.104.217.61",
          "compute_ip_range": "10.10.0.0/16"
        }
        ```
    === "Kubernetes Multinode"
        ```json
        {
          "cluster_type": "openflight-kubernetes-multinode",
          "cluster_name": "my-cluster",
          "default_username": "flight",
          "default_password": "0penfl1ght",
          "access_host": "51.104.217.61",
          "compute_ip_range": "10.10.0.0/16",
          "pod_ip_range": "192.168.0.0/16"
        }
        ```
    === "Jupyter"
        ```json
        {
          "cluster_type": "openflight-jupyter-standalone",
          "cluster_name": "my-cluster",
          "default_username": "flight",
          "default_password": "0penfl1ght",
          "access_host": "51.104.217.61"
        }
        ```

An example of using `answers` to configure a slurm multinode cluster would be:
```bash
flight profile configure --answers '{  "cluster_type": "openflight-slurm-standalone",  "cluster_name": "my-cluster",  "default_username": "flight",  "default_password": "0penfl1ght",  "access_host": "51.104.217.61"}'
```

!!! tip
    The OpenFlight Cluster Types provided along with Flight Profile attempt to determine sensible defaults which will aid in providing the correct information for configuring the cluster

---

### `apply <node,node2...> <identity>`

Applies an identity to one or more nodes. e.g. `flight profile apply node01,node02` or `flight profile apply node01`. If an identity's dependencies are not met then the application of the identity to the node will become queued until requirements are satisfied.

- `--force` - Overwrite the identity of a node that has already been applied to.
- `--remove-on-shutdown` - Adds a systemd hook to the node which will trigger removal from the cluster on shutdown if the node's identity supports removal.
- `--wait` - Don't background the process of removal 
- `--groups` - Select nodes to apply to based on [hunter groups](./hunter.md#modify-groups-node)
- `--detect-identity` - Attempt to automatically determine the identity to apply based on the [hunter groups](./hunter.md#modify-groups-node) of the node. If any group matches that of the available identities for the current cluster type, it will be applied. 
- `--dry-run` - Show which identities would be applied to which nodes without actually performing apply process

!!! tip
    You can select multiple nodes at once by writing a comma separated list, or with square bracket expansion (like [genders syntax](../../../hpc-environment-basics/linux-usage/genders-pdsh.md#creating-a-genders-file)). For example, `apply node[01-02] compute` would apply `compute` to `node01` and `node02`

---

### `avail`

Lists the available cluster types.

---

### `clean <node>`

Removes the data for one or more nodes that failed application or removal from appearing in the list of profile accessible nodes. This means the node will show as `available`.

---

### `dequeue <node>`

Removes a node from the apply queue.

---

### `identities <type>`

Shows a list of all available identities for a cluster type. If there is no given cluster type, identities will be shown for the currently configured cluster type.

---

### `list`

Displays the identity and status of every node available to profile. e.g.
```bash
[flight@chead1 (mycluster1) [login1] ~]$ flight profile list
┌────────┬──────────┬───────────┐
│ Node   │ Identity │ Status    │
├────────┼──────────┼───────────┤
│ login1 │ login    │ complete  │
│ node02 │ compute  │ failed    │
│ node01 │          │ available │
└────────┴──────────┴───────────┘
```

---

### `prepare <type>`

Prepares a cluster type, completing dependencies. If no cluster type is specified then the currently configured one is used.

!!! info
    The type you wish to use will need to be prepared on all nodes that are to be included in the cluster, this is because the preparation process installs the required dependencies for the cluster type for the current system only

---

### `remove <node,node...>`

Removes the identity of a node, so that it is no longer works as part of the cluster.

- `--remove-hunter-entry` - Also remove it from the hunter list.
- `--force` - Bypass restrictions on using `remove` on a node.
- `--wait` - Don't background the process of removal 

!!! note
    `remove` is limited to only some identities, so not all identities can be removed.

!!! tip
    You can select multiple nodes at once by writing a comma separated list, or with square bracket expansion (like [genders syntax](../../../hpc-environment-basics/linux-usage/genders-pdsh.md#creating-a-genders-file)). For example, `remove node[01-02] compute` would remove `node01` and `node02`

---

### `view <node>`

Shows the setup/removal progress of a node and its current status
- `--raw` - Shows the entire ansible log output.
- `--watch` - View the process "live", regularly updates the output on the screen to show current status

---

## Auto-apply

Profile can automatically apply an identity to a node with the auto-apply configuration. This is done by configuring `flight hunter hunt` to automatically apply identities whenever a node is parsed with `auto-parse`.

!!! warning
    You must have already configured flight profile with the `configure` command or else auto-applying will not work.

### Setup Auto-apply

1. Open the file `/opt/flight/opt/hunter/etc/config.yml`

    !!! note
        You will need to have [root user permissions](../../../hpc-environment-basics/linux-usage/cli-basics/becoming-root.md) to edit this config file.

2. Add these lines: 
    ```
    auto_apply:
      <regex>: <identity>
    ```
    - You can add extra lines of `<regex>: <identity>` to catch more identities. e.g.
        ```
        auto_apply:
          cnode: compute
          chead: login
        ```
3. Restart the hunter service with `flight service restart hunter`.
    - Alternatively, you can stop the hunter service with `flight service stop hunter` and then run `flight hunter hunt`.

## Auto-remove

Profile can automatically remove nodes when they are shutdown, additionally it can remove them from the hunter inventory when they are successfully removed. This setup, coupled with auto-apply, can create a cluster that dynamically grows and shrinks with an auto-scaling group on various cloud platforms. 

### Setup Auto-remove

1. Open the file `/opt/flight/opt/hunter/etc/config.yml`

    !!! note
        You will need to have [root user permissions](../../../hpc-environment-basics/linux-usage/cli-basics/becoming-root.md) to edit this config file.

1. Add the following lines:
    ```yaml
    remove_on_shutdown: true
    remove_hunter_entry: true
    ```

Now when a node has an identity applied to it then the service to automatically trigger removal on shutdown will be added to it. Further to this, when the node is successfully removed then the corresponding hunter entry will also be removed. 

