# Viewing Default Resources

In order to promote efficient usage of your research environment, the job-scheduler automatically sets a number of default resources for your jobs when you submit them. These defaults must be overridden by users to help the scheduler understand how you want it to run your job - if we don’t include any instructions to the scheduler, then our job will take the defaults shown below:

- Number of CPU cores for your job: 1
- Number of nodes for your job: the default behavior is to allocate enough nodes to satisfy the requirements of the number of CPUs requested

You can view all default resource limits by running the following command:

```
[root@chead1(mycluster1) ~]# scontrol show config | grep Def
CpuFreqDef              = Unknown
DefMemPerNode           = UNLIMITED
MpiDefault              = none
SallocDefaultCommand    = (null)
```

This documentation will explain how to change these limits to suit the jobs that you want to run. You can also disable these limits if you prefer to control resource allocation manually by yourself.
