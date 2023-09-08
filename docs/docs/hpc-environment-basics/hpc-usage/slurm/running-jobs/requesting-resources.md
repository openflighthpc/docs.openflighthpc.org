# Requesting More Resources

By default, jobs are constrained to the default set of resources - users can use scheduler instructions to request more resources for their jobs. The following documentation shows how these requests can be made.

## Running Multi-Threaded Jobs

If users want to use multiple cores on a compute node to run a multi-threaded application, they need to inform the scheduler - this allows jobs to use multiple cores without needing to rely on any interconnect. Using multiple CPU cores is achieved by specifying the `-n` or `--ntasks=<number>` option in either your submission command or the scheduler directives in your job script. The `--ntasks` option informs the scheduler of the number of cores you wish to reserve for use. If the parameter is omitted, the default `--ntasks=1` is assumed. You could specify the option `-n 4` to request 4 CPU cores for your job. Besides the number of tasks, you will need to add `--nodes=1` to your scheduler command or at the top of your job script with `#SBATCH --nodes=1`, this will set the maximum number of nodes to be used to 1 and prevent the job selecting cores from multiple nodes.

```bash
#!/bin/bash -l
#SBATCH --nodes=2
#SBATCH --ntasks=2
#SBATCH --mem=200
echo "Example asking for 2 CPU cores and 2 nodes"

```

!!! warning
    If you request more cores than are available on a node in your research environment, the job will not run until a node capable of fulfilling your request becomes available. The scheduler will display the error in the output of the `squeue` command

## Running Parallel (MPI) Jobs

If users want to run parallel jobs via a messaging passing interface (MPI), they need to inform the scheduler - this allows jobs to be efficiently spread over compute nodes to get the best possible performance. Using multiple CPU cores across multiple nodes is achieved by specifying the `-N` or `--nodes=<minnodes[-maxnodes]>` option - which requests a minimum (and optional maximum) number of nodes to allocate to the submitted job. If _only_ the `minnodes` count is specified - then this is used for both the minimum _and_ maximum node count for the job.

`--nodes=1-4`

: Example of how to request a minimum of 1 node and maximum of 4.

You can request multiple cores over multiple nodes using a combination of scheduler directives either in your job submission command or within your job script. Some of the following examples demonstrate how you can obtain cores across different resources;

`--nodes=2 --ntasks=16`

: Requests 16 cores across 2 compute nodes

`--nodes=2`

: Requests all available cores of 2 compute nodes

`--ntasks=16`

: Requests 16 cores across any available compute nodes

!!! warning
    If you request more CPU cores than your research environment can accommodate, your job will wait in the queue.

## Requesting More Memory

In order to promote best use of the research environment scheduler - particularly in a shared environment, it is recommended to inform the scheduler the maximum required memory per submitted job. This helps the scheduler appropriately place jobs on the available nodes in the research environment.

You can specify the maximum amount of memory required per submitted job with the `--mem=<MB>` option. This informs the scheduler of the memory required for the submitted job. Optionally - you can also request an amount of memory _per CPU core_ rather than a total amount of memory required per job. To specify an amount of memory to allocate _per core_, use the `--mem-per-cpu=<MB>` option.

Examples:

- `--mem=200` - Requesting 200MB of memory.
- `--mem-per-cpu=10` - Requesting 10MB of memory per CPU.

!!! note
    When running a job across multiple compute hosts, the `--mem=<MB>` option informs the scheduler of the required memory per node

## Requesting a Longer Runtime 

In order to promote best-use of the research environment scheduler, particularly in a shared environment, it is recommend to inform the scheduler the amount of time the submitted job is expected to take. You can inform the research environment scheduler of the expected runtime using the `-t, --time=<time>` option. For example - to submit a job that runs for 2 hours, the following example job script could be used:

```bash
#!/bin/bash -l
#SBATCH --job-name=sleep
#SBATCH -D $HOME/
#SBATCH --time=0-2:00
sleep 7200
```

You can then see any time limits assigned to running jobs using the command `squeue --long`:

```bash
[flight@chead1 (mycluster1) ~]$ squeue --long
Tue Aug 30 10:55:55 2016
             JOBID PARTITION     NAME     USER    STATE       TIME TIME_LIMI  NODES NODELIST(REASON)
              1163       all    sleep    centos  RUNNING       0:07   2:00:00      1 ip-10-75-1-42
```
