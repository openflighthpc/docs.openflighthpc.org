# Submitting an Array Job

A common workload is having a large number of jobs to run which basically do the same thing, aside perhaps from having different input data. You could generate a job-script for each of them and submit it, but that's not very convenient - especially if you have many hundreds or thousands of tasks to complete. Such jobs are known as **task arrays** - an [embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel) job will often fit into this category.

A convenient way to run such jobs on a research environment is to use a task array, using the `-a [array_spec] | --array=[array_spec]` directive. Your job-script can then use the pseudo environment variables created by the scheduler to refer to data used by each task in the job. The following job-script uses the `$SLURM_ARRAY_TASK_ID`/`%a` variable to echo its current task ID to an output file:

```bash
#!/bin/bash -l
#SBATCH --job-name=array
#SBATCH --output=output.array.%A.%a
#SBATCH --array=1-1000
echo "I am $SLURM_ARRAY_TASK_ID from job $SLURM_ARRAY_JOB_ID"
```


```bash
[flight@chead1 (mycluster1) ~]$ sbatch arrayjob.sh
Submitted batch job 77
[flight@chead1 (mycluster1) ~]$ squeue
           JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
    77_[85-1000]       all    array    centos PD       0:00      1 (Resources)
           77_71       all    array    centos  R       0:00      1 node03
           77_72       all    array    centos  R       0:00      1 node06
           77_73       all    array    centos  R       0:00      1 node03
           77_74       all    array    centos  R       0:00      1 node06
           77_75       all    array    centos  R       0:00      1 node07
           77_76       all    array    centos  R       0:00      1 node07
           77_77       all    array    centos  R       0:00      1 node05
           77_78       all    array    centos  R       0:00      1 node05
           77_79       all    array    centos  R       0:00      1 node02
           77_80       all    array    centos  R       0:00      1 node04
           77_81       all    array    centos  R       0:00      1 node01
           77_82       all    array    centos  R       0:00      1 node01
           77_83       all    array    centos  R       0:00      1 node02
           77_84       all    array    centos  R       0:00      1 node04
```

All tasks in an array job are given a job ID with the format `[job_ID]_[task_number]` e.g. `77_81` would be job number 77, array task 81.

Array jobs can easily be cancelled using the `scancel` command - the following examples show various levels of control over an array job:

`scancel 77`

: Cancels all array tasks under the job ID `77`

`scancel 77_[100-200]`

: Cancels array tasks `100-200` under the job ID `77`

`scancel 77_5`

: Cancels array task `5` under the job ID `77`
