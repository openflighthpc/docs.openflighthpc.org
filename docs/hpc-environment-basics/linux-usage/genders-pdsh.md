# Genders and PDSH

## Overview

**Genders** provides a simple method for categorising a node inventory. To learn more about genders, read the [official tutorial](https://github.com/chaos/genders/blob/master/TUTORIAL).

**PDSH** provides a CLI tool for performing commands on multiple nodes at once, utilising the data stored in genders. To learn more about using PDSH, read the manual page for the command `man pdsh`.

!!! info
    OpenFlight has it's own build of PDSH which is explained in further detail in [the documentation](../../flight-environment/tools/flight-pdsh.md)

## Installing Genders and PDSH

The packages should be available in the package manager for your distribution. To install on CentOS/RHEL/Rocky:

```bash
dnf install pdsh genders
```

!!! note
    You will need `sudo` permissions to install packages, see [becoming the root user](cli-basics/becoming-root.md) for more information

## Creating a Genders File

Open the genders file (`/etc/genders`) with your preferred text editor and add a gender in with the following format:

```
node01,node02,node03,node04,node05 gendername
```

There are alternate formats that make writing a gender easier:

```
node01,node02,node03,node04,node05:    node[01-05]
node3,node7,node9,node10,node11:       node[3,7,9-11]
nodei,nodej,node0,node1,node2:         nodei,nodej,node[0-2]
```

For example:

```
node[01-05] mygroup1
nodeA,nodeB,node[1,2,3,10-20],nodeC mygroup2
```

After adding the desired gender(s), save and close the file.

## Finding the Names of Your Compute Nodes

In best practice, the hostnames of compute nodes usually follow a sequential order (e.g. node01, node02, node03... node10).

Users can find the names of their compute nodes by using the `nodeattr` command with a group; e.g.

```bash title="Show a space-separated list of hosts in the group 'nodes'"
nodeattr -s nodes
```

```bash title="Show a comma-separated list of hosts in the group 'group'"
nodeattr -c group
```

```bash title="Show a newline-separate list of hosts in the group 'groups'"
nodeattr -n groups
```

## Using PDSH

Users can run a command across many hosts at once using the pdsh command. This can be useful if users want to make the same change to multiple systems in the research environment - for example, installing a new software package. The `pdsh` command can take a number of parameters that control how commands are processed; for example:

```bash title="Run `uptime` across hosts in the 'all' group" 
pdsh -g all uptime
```
```bash title="Install the package `screen` with `yum` on all hosts in the 'nodes' group"
pdsh -g nodes 'sudo yum -y install screen'
```

```bash title="Check usage of `/tmp` on all hosts in the 'nodes' group one at a time"
pdsh -g nodes -f 1 df -h /tmp
```

```bash title="Run `which ldconfig` on two specified hosts"
pdsh -w node01,node03 which ldconfig
```
