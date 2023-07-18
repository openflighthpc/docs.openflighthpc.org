# Flight Hunter 

Flight hunter is a host inventory tool used find and connect to nodes in a compute cluster. It is predominantly used while setting up a cluster.

Flight hunter's namesake feature is the ability to discover nodes on the local network by hunting. It can also send information between nodes, and can send on startup to a designated server node.

### Hunt

Hunting can be started with the command `flight hunter hunt`. e.g.
```bash
[flight@chead1 (mycluster1) [login1] ~]$ flight hunter hunt
Hunter running on port 8888 - Ctrl+C to stop
```

There are several options that change how `hunt` works

#### Hunt Options

- `--allow-existing` - Duplicate entries will replace existing ones rather than being rejected.
- `--port <port>` - Overrides the default port to accept on.
- `--include-self` - Sends itself to hunter.
- `--auth <auth>` - Defines a password to use as an authentication key, only incoming senders with the correct auth will be accepted.
- `--auto-parse <regex>` - Automatically parses nodes matching this regex when they are added.

Hunter also has the ability to automatically apply a profile identity to nodes as soon as they are parsed. This is called `auto-apply` - it is not a command line option, it must be configured through hunter config files. 

!!! tip
    All the above options can be set in the Flight Hunter config file located within `etc/config.yml` in the installation directory (if installed through the package this will be at `/opt/flight/opt/hunter/etc/config.yml`). For more information on configuring Flight Tools see the [configuration document](../../get-flight/configure.md#filesystem-structure)

## Send

Sending inventory information to a hunter server can be done with the command `flight hunter send`. And a message will be displayed on a successful transmission.
```bash
[flight@chead1 ~]$ flight hunter send --server 10.10.0.1
Successful transmission
```

### Send Options

- `--port <port number>` - Overrides the default port to send to.
- `--server <ip address>` - Overrides the default server name, useful if the default is not set.
- `--auth <auth>` - Defines a password to use as an authentication key.
- `--broadcast` - Makes send broadcast to all addresses on the default subnet.
- `--broadcast-address <subnet>` - Overrides the default subnet to send to, use if the default subnet was not configured.
- `--groups <group1,group2,group3...>` - Specifies the groups that this nodes should be in.
- `--label <label>` - Defines a label to use when parsing this node.
- `--prefix <prefix>` - Defines a prefix, which will be numbered, and used as a label.
- `--command <command>` - Runs the given console command and sends the output as the payload of the send.

!!! tip
    All the above options can be set in the Flight Hunter config file located within `etc/config.yml` in the installation directory (if installed through the package this will be at `/opt/flight/opt/hunter/etc/config.yml`). For more information on configuring Flight Tools see the [configuration document](../../get-flight/configure.md#filesystem-structure)

## Parse

One of hunter's main features is the ability to parse discovered nodes to prepare them for use with other flight tools. A benefit of the parsing feature is applying "labels" to discovered hosts, in ephemeral systems the hostnames may not be ideally formed or of a memorable length so labels make it easier to identify hosts. 

!!! note
    There must be some discovered nodes in the hunter buffer, otherwise there is nothing to parse.

The `parse` command will generate a list, for example:
```bash
[flight@login-node.novalocal ~]$ flight hunter parse
Select nodes: (Scroll for more nodes)
‣ ⬡ login-node.novalocal - 127.0.0.1
  ⬡ compute-node-1.novalocal - 10.151.15.194
  ⬡ compute-node-2.novalocal - 10.151.15.238
```
To parse, select a from the list with the `space` key, and you will be taken to the label editor.

```bash
Choose label: login-node.novalocal
```
Here, you can edit the label like plain text.
```bash
Choose label: login1
```
!!! tip
    You can clear the current node name by pressing `down` in the label editor.

When done editing, press the `enter` key to save. The modified node label will appear next to the ip address and original node label.
```
Select nodes: login-node.novalocal - 127.0.0.1 (login1) (Scroll for more nodes)
‣ ⬢ login-node.novalocal - 127.0.0.1 (login1)
  ⬡ compute-node-1.novalocal - 10.151.15.194
  ⬡ compute-node-2.novalocal - 10.151.15.238
```

From this point, you can either hit the `enter` key to finish parsing and process the selected nodes, or continue changing node labels. Either way, you can return to this list by running `flight hunter parse` again.

!!! question
    Do you have many hosts in the buffer to pass at once?

    If the hostnames of these are acceptable or labels/prefixes have been set then the `--auto` option will allow for bulk parsing of the buffer. Further information on configuring auto-parsing is available in the [Flight Hunter repository](https://github.com/openflighthpc/flight-hunter#automatic-parser)

### Parse options

There are some additional options that can be used with parse.

- `--prefix <prefix>` - Defines a prefix, which will be numbered, and used as a label.
- `--start <number>` - Defines the start value for the numbering of prefixes.
- `--auto` - Automatically parses everything in the buffer list.
- `--allow-existing` - Duplicate entries will replace existing ones rather than being rejected.
- `--skip-used-index` - If there is already a node with particular label, then entering the a different node with the same label will increase the index to the next available one instead of throwing an error.

!!! tip
    All the above options can be set in the Flight Hunter config file located within `etc/config.yml` in the installation directory (if installed through the package this will be at `/opt/flight/opt/hunter/etc/config.yml`). For more information on configuring Flight Tools see the [configuration document](../../get-flight/configure.md#filesystem-structure)

## Other hunter commands

Further commands and features of hunter are covered below

---

### `autorun`

This command automatically runs either `hunt` or `send` based on its configuration.

!!! note
    This is used by the hunter service to launch hunter with the correct settings and isn't intended for use by end-users

---

### `dump-buffer`

Drops all nodes in the buffer list.

---

### `list`

Shows all nodes in the parsed list of nodes, and has several additional options:

- `--plain` - Displays in a plain format
- `--by-group` - Displays by group.
- `--buffer` - Shows the buffer list instead.

---

### `modify-groups <node>`

Allows for adding or removing of groups to a node.

- `--add <groups>` - Adds a group or comma separated list of groups.
- `--remove <groups>` - Removes a group or comma separated list of groups.
- `--buffer` - Modifies groups in the buffer list instead.
- `--regex` - The nodename is parsed as regex instead, and group changes are made to all nodes that match.

---

### `modify-label <old> <new>`

Changes the label of a node from its current one to a new one.

---

### `remove-node <label>`

Remove a node from the parsed list.

- `--buffer` - Remove from the buffer list, and used the node id instead.
- `--name` - Specify the node by regex matching the hostname instead.

---

### `rename-group <group> <new name>`

Renames a group, keeping all the nodes it contains.

- `--buffer` - Uses the buffer list instead.

---

### `show <label>`

Shows the details of a node, identifying it by label

- `--buffer` - View a node in the buffer list instead, identifying it by id.
- `--plain` - Print in a plain format, more easily machine readable.
