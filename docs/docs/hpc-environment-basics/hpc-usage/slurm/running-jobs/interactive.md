# Submitting an Interactive Job

You can start a new interactive job on your research environment by using the `srun` command; the scheduler will search for an available compute node, and provide you with an interactive login shell on the node if one is available.

```bash
[flight@chead1 (mycluster1) ~]$ srun --pty /bin/bash
[flight@node01 (mycluster1) ~]$
[flight@node01 (mycluster1) ~]$ squeue
           JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
               3       all     bash    centos R       0:39      1 node01
```

In the above example, the `srun` command is used together with two options: `--pty` and `/bin/bash`. The `--pty` option executes the task in pseudo terminal mode, allowing the session to act like a standard terminal session. The `/bin/bash` option is the command that you wish to run - here the default Linux shell, BASH.

Alternatively, the `srun` command can also be executed from an interactive desktop session; the job-scheduler will automatically find an available compute node to launch the job on. Applications launched from within the `srun` session are executed on the assigned research environment compute node.

![](img/interactivejob.png)


!!! tip 
    The Slurm scheduler does not automatically set up your session to allow you to run graphical applications inside an interactive session. Once your interactive session has started, you must run the following command before running a graphical application: `export DISPLAY=chead1$DISPLAY`

!!! warning
    Running X applications from a compute node may not work due to missing X libraries on the compute node, these can be installed from an SSH session into a compute node with `sudo yum groupinstall "X Window System"`

When you've finished running your application in your interactive session, simply type `logout`, `exit`, or press ++ctrl+d++ to exit the interactive job.

If the job-scheduler could not satisfy the resource you've requested for your interactive job (e.g. all your available compute nodes are busy running other jobs), it will report back after a few seconds with an error:

```bash
[flight@chead1 (mycluster1) ~]$ srun --pty /bin/bash
srun: job 20 queued and waiting for resources
```

