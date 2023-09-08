# Flight PDSH

The Flight PDSH command provides a build of PDSH that sits within the [flight filesystem](../..//get-flight/configure.md#filesystem-structure) and defaults to using a genders file located at `/opt/flight/etc/genders`.

If a system pdsh package is installed then the priority of the conflicting pdsh commands can be set with the `flight config` command. To use the flight pdsh command by default run:
```bash
flight config set pdsh.priority embedded
```

To use the system one, set the `pdsh.priority` to `system`. 

Further information on using genders and pdsh can be found in the [HPC Environment Basics](../../../hpc-environment-basics/linux-usage/genders-pdsh.md) section.
