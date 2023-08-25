# Flight Gather

Flight Gather collects system information into a processable YAML format. 

Data collected by Flight Gather: 

- BIOS Version
- Serial Number
- Total RAM
- CPU info (sockets, cores, IDs, models) 
- Network info (interfaces, MAC addresses, speed) 
- Disk info (name, size)
- GPU info (name, slot) 
- Platform

Further to the above, the user can provide groups (in a similar vein to [genders](../../../hpc-environment-basics/linux-usage/genders-pdsh.md#creating-a-genders-file)) to add further categorisation to the data. This is useful when collating the data from many systems. 

## Using Flight Gather 

There are a few basic usages to flight gather:

- Collect system information 
    ```bash
    flight gather collect
    ```
- View the system information
    ```bash
    flight gather show 
    ```
- Modify groups assigned to the data
    ```bash
    flight gather modify --primary MyPrimaryGroupName
    ```

!!! tip
    To find further information on the tool and command options see the help page for the tool `flight gather --help`, the same can be done for sub-commands (e.g. `flight gather collect --help`) 
