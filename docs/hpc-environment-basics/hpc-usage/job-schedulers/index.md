# Job Schedulers 

This section provides more information about jobs, including what they do, what different types are available and how they might be used.

## What is a Job?

A job can be loosely defined as an automated research task, for example, a bash script that runs various stages in an OpenFoam simulation on a model.

Jobs vary in size, resource usage and run time. A job could utilise multiple cores through parallel libraries or simply run on a single core.

## What is a Scheduler?

Most existing HPC environments are managed by a job scheduler; also known as the batch scheduler, workload manager, queuing system, or load-balancer. The scheduler allows multiple users to fairly share compute nodes, allowing system administrators to control how resources are made available to different groups of users. All schedulers are designed to perform the following functions:

- Allow users to submit new jobs to the research environment
- Allow users to monitor the state of their queued and running jobs
- Allow users and system administrators to control running jobs
- Monitor the status of managed resources including system load, memory available, etc.

When a new job is submitted by a user, the research environment scheduler software assigns compute cores and memory to satisfy the job requirements. If suitable resources are not available to run the job, the scheduler adds the job to a queue until enough resources are available for the job to run. You can configure the scheduler to control how jobs are selected from the queue and executed on research environment nodes, including automatically preparing nodes to run parallel MPI jobs. Once a job has finished running, the scheduler returns the resources used by the job to the pool of free resources, ready to run another user job.

## Why use a Scheduler?

Good question. A job-scheduler is often used as a control mechanism to make sure that users don't unfairly monopolise the valuable compute resources. In extreme cases, the scheduler may be wielded by system administrators to force “good behaviour” in a shared environment, and can feel like an imposition to research environment users.

However, a job-scheduler can still be a useful tool for a research environment rather than just a control mechanism:

1. It can help you organise multi-stage work flows, with batch jobs launching subsequent jobs in a defined process.
2. It can automate launching of MPI jobs, finding available nodes to run applications on.
3. It can help prevent accidentally over-allocating CPUs or memory, which could lead to nodes failing.
4. It can help bring discipline to the environment, providing a consistent method to replicate the running of jobs in different environments.

Your research environment comes with a job-scheduler pre-installed, ready for you to start using. The scheduler uses very few resources when idle, so you can choose to use it if you find it useful, or run jobs manually across your research environment if you prefer.
