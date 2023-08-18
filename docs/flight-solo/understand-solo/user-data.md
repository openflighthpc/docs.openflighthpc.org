# Cloud-Init User Data with Flight Solo

User data (otherwise known as "cloud-init data" or "cloud data") is a way of giving data to an instance for it to run as part of the startup process. This page will describe how to provide user data specific to Flight Solo to customise and configure your cluster.

When present, the file `/opt/flight/cloudinit.in` will be read and used to configure the Flight Solo image on first boot. The best way of creating this file on boot is by creating it with user data and providing the desired configuration keys to be written to the file. 

The cloud-init `write_files` directive is used to create the file which is read in. A basic user data script that creates this file would look like:
```bash title="Minimal Cloud Config Script" 
#cloud-config
write_files:
  - content: |
      OPTION="value" # (1)!
      OPTION2="value2"
    path: /opt/flight/cloudinit.in
    permissions: '0600'
    owner: root:root
```

1. Replace `OPTION` with a config option described below

## Flight Solo Config Options

The available options for the Flight Solo cloud-init file are as follows.

### `SERVER`

: Sets the target address that [Flight Hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md#send) on the node will send to at startup. It is recommended that this is the local IP of whichever server is going to be used to manage the inventory of hosts. 

    ```bash title="Example Usage"
    SERVER=10.10.0.1
    ```

### `BROADCAST_ADDRESS`

: Set the broadcast address which [Flight Hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md#send) will send to. 

    ```bash title="Example Usage" 
    BROADCAST_ADDRESS=10.10.255.255 # (2)!
    ```

### `AUTH_KEY`

: Sets the auth key that is used by [Flight Hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md), this is used by both the `hunt` process and `send` command. Use this to secure your hunter inventory by only allowing hosts to push their information to it with a matching key.

    ```bash title="Example Usage" 
    AUTH_KEY=banana
    ```

### `LABEL`

: Sets label to be used for the node in [Flight Hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md#parse).

    ```bash title="Example Usage"
    LABEL=node01
    ```

### `PREFIX`

: Sets the prefix to be used for the node in [Flight Hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md#parse).

    ```bash title="Example Usage" 
    PREFIX=node
    ```

    !!! note
        This option is superseded by `LABEL` if both are provided

### `AUTOPARSEMATCH`

: Sets the regex for auto-parse rules in the [Flight Hunter](../../flight-environment/use-flight/flight-admin-tools/hunter.md#hunt) server. 

    ```bash title="Example Usage 1 - Match any incoming hostnames including 'example-domain'" 
    AUTOPARSEMATCH=example-domain
    ```

    ```bash title="Example Usage 2 - Parse all hosts that make it into the buffer" 
    AUTOPARSEMATCH=.*
    ```

### `SHAREPUBKEY`

: If set to true then this node will share the root user's pub ssh key over the local network on port 1234. This means that any solo images with `SERVER` set to this node will attempt to grab its public key to allow root SSH between your cluster.

    ```bash title="Example Usage"
    SHAREPUBKEY=true
    ```

### `PROFILE_ANSWERS`

: Set to json text which is used to answer [profile configure](../../flight-environment/use-flight/flight-admin-tools/profile.md#configure) questions, the format should be the same as for the profile configure sub-option `--answers`. Any answers not supplied will be set to their default values.

    ```bash title="Example Usage"
    PROFILE_ANSWERS='{ "cluster_type": "openflight-slurm-standalone", "cluster_name": "mycluster1" }'
    ```

### `AUTOAPPLY`

: Set automatic application of identities to nodes. When a node connects with hunter, if it matches one of the regular expressions then the corresponding identity will be applied.  

    ```bash title="Example Usage - Match hunter labels containing 'node' and apply the 'compute' identity to them, match hunter labels with 'gateway' in them and apply 'login' identity"
    AUTOAPPLY="node: compute, gateway: login"
    ```

    !!! note
        `AUTOAPPLY` can only start if a cluster type has already been configured on this node. The configuration of the Flight Profile can be done before launching client nodes or set with `PROFILE_ANSWERS`. 

### `PREFIX_STARTS`

: Set prefix start numbers based on node name. When a node connects with hunter, if it has a prefix which matches one of the regular expressions then it will be given a number, starting with the start number and incrementing until there is an unused number.

    ```bash title="Example Usage - Increment counts for 'node' from '001' and 'gpu' from '01'"
    PREFIX_STARTS="node: '001', gpu: '01'"
    ```

    !!! note
        Many of these relate to command line options that are explained in more detail in the [Flight Hunter documentation](../../flight-environment/use-flight/flight-admin-tools/hunter.md).
