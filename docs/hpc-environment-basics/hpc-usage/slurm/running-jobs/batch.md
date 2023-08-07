# Submitting a Batch Job

Batch (or non-interactive) jobs allow users to leverage one of the main benefits of having a research environment scheduler; jobs can be queued up with instructions on how to run them and then executed across the research environment while the user [does something else](https://www.quora.com/What-do-you-do-while-youre-waiting-for-your-code-to-finish-running). Users submit jobs as scripts, which include instructions on how to run the job - the output of the job (_stdout_ and _stderr_ in Linux terminology) is written to a file on disk for review later on. You can write a batch job that does anything that can be typed on the command-line.

We’ll start with a basic example - the following script is written in bash (the default Linux command-line interpreter). You can create the script yourself using the [Nano](https://www.howtogeek.com/howto/42980/the-beginners-guide-to-nano-the-linux-command-line-text-editor/) command-line editor - use the command `nano simplejobscript.sh` to create a new file, then type in the contents below. The script does nothing more than print some messages to the screen (the **echo** lines), and sleeps for 120 seconds. We’ve saved the script to a file called `simplejobscript.sh` - the `.sh` extension helps to remind us that this is a _shell_ script, but adding a filename extension isn’t strictly necessary for Linux.

```bash
#!/bin/bash -l
echo "Starting running on host $HOSTNAME"
sleep 120
echo "Finished running - goodbye from $HOSTNAME"
```

!!! info
    We use the `-l` option to bash on the first line of the script to request a login session. This ensures that environment modules can be loaded as required as part of your script.

We can execute that script directly on the login node by using the command `bash simplejobscript.sh` - after a couple of minutes, we get the following output:

```bash
Started running on host chead1
Finished running - goodbye from chead1
```

To submit your job script to the research environment job scheduler, use the command `sbatch simplejobscript.sh`. The job scheduler should immediately report the job-ID for your job; your job-ID is unique for your current research environment - it will never be repeated once used.

```bash
[flight@chead1 (mycluster1) ~]$ sbatch simplejobscript.sh
Submitted batch job 21

[flight@chead1 (mycluster1) ~]$ ls
simplejobscript.sh  slurm-21.out

[flight@chead1 (mycluster1) ~]$ cat slurm-21.out
Starting running on host node01
Finished running - goodbye from node01
```
