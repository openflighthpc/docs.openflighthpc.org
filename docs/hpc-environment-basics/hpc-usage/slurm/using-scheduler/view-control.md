# Viewing and Controlling Queued Jobs

Once your job has been submitted, use the `squeue` command to view the status of the job queue. If you have available compute nodes, your job should be shown in the `R` (running) state; if your compute nodes are busy your job may be shown in the `PD` (pending) state until compute nodes are available to run it. If a job is in `PD` state - the reason for being unable to run will be displayed in the `NODELIST(REASON)` column of the `squeue` output.

```bash
[flight@chead1 (mycluster1) ~]$ squeue
         JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
            41       all simplejo    centos  R       0:03      1 node01
            42       all simplejo    centos  R       0:00      1 node01
```

You can keep running the `squeue` command until your job finishes running and disappears from the queue. The output of your batch job will be stored in a file for you to look at. The default location to store the output file is your home directory. You can use the Linux `more` command to view your output file:

```bash
[flight@chead1 (mycluster1) ~]$ more slurm-42.out
Starting running on host node01
Finished running - goodbye from node01
```

Your job runs on whatever node the scheduler can find which is available for use - you can try submitting a bunch of jobs at the same time, and using the `squeue` command to see where they run. The scheduler is likely to spread them around over different nodes (if you have multiple nodes). The login node is not included in your research environment for scheduling purposes - jobs submitted to the scheduler will only be run on your research environment compute nodes. You can use the `scancel <job-ID>` command to delete a job you've submitted, whether it's running or still in the queued state.

```bash
[flight@chead1 (mycluster1) ~]$ sbatch simplejobscript.sh
Submitted batch job 46
[flight@chead1 (mycluster1) ~]$ sbatch simplejobscript.sh
Submitted batch job 47
[flight@chead1 (mycluster1) ~]$ sbatch simplejobscript.sh
Submitted batch job 48
[flight@chead1 (mycluster1) ~]$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
                43       all simplejo    centos  R       0:04      1 node01
                44       all simplejo    centos  R       0:04      1 node01
                45       all simplejo    centos  R       0:04      1 node02
                46       all simplejo    centos  R       0:04      1 node02
                47       all simplejo    centos  R       0:04      1 node03
                48       all simplejo    centos  R       0:04      1 node03

[flight@chead1 (mycluster1) ~]$ scancel 47
[flight@chead1 (mycluster1) ~]$ squeue
             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
                43       all simplejo    centos  R       0:11      1 node01
                44       all simplejo    centos  R       0:11      1 node01
                45       all simplejo    centos  R       0:11      1 node02
                46       all simplejo    centos  R       0:11      1 node02
                48       all simplejo    centos  R       0:11      1 node03
```

