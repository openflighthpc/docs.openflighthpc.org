# Viewing Compute Host Status

Users can use the `sinfo -Nl` command to view the status of compute node hosts in your research environment.

```bash
[flight@chead1 (mycluster1) ~]$ sinfo -Nl
Fri Aug 26 14:46:34 2016
NODELIST        NODES PARTITION       STATE CPUS    S:C:T MEMORY TMP_DISK WEIGHT AVAIL_FE REASON
node01       1      all*        idle    2    2:1:1   3602    20462      1   (null) none
node02      1      all*        idle    2    2:1:1   3602    20462      1   (null) none
node03      1      all*        idle    2    2:1:1   3602    20462      1   (null) none
node04      1      all*        idle    2    2:1:1   3602    20462      1   (null) none
node05      1      all*        idle    2    2:1:1   3602    20462      1   (null) none
node06      1      all*        idle    2    2:1:1   3602    20462      1   (null) none
node07      1      all*        idle    2    2:1:1   3602    20462      1   (null) none
```

The `sinfo -Nl` output will show (from left-to-right):

- The hostname of your compute nodes
- The number of nodes in the list
- The node partition the node belongs to
- Current usage of the node - if no jobs are running, the state will be listed as `idle`. If a job is running, the state will be listed as `allocated`
- The detected number of CPUs (including hyper-threaded cores)
- The number of sockets, cores and threads per node
- The amount of memory in MB per node
- The amount of disk space in MB available to the `/tmp` partition per node
- The scheduler weighting

Using the command `sinfo` without ` -Nl` will display only some information and in a different order.

```bash
[flight@chead1 (mycluster1) ~]$ sinfo
PARTITION AVAIL  TIMELIMIT  NODES  STATE NODELIST
all*         up   infinite      2   idle cnode[01-02]
```
