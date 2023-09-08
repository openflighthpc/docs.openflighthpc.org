
## Shared Storage

With HPC environments typically combining multiple hosts there comes the requirement to be able to share user data quickly between the available resources. Due to this, HPC environments usually have some sort of shared storage solution.

The shared storage solution can share user home directories between all the nodes, create shared mount-points for a project or department and even provide redundancy by using resilient storage back-ends. 

## Local Scratch 

Your compute nodes may have an amount of disk space available to store temporary data under the `/tmp` mount-point. This area is intended for temporary data created during compute jobs, and shouldn't be used for long-term data storage. Compute nodes are configured to clear up temporary space automatically, removing orphan data left behind by jobs.

Users must make sure that they copy data they want to keep back to the shared filesystem after compute jobs have been completed.

Utilising local scratch can dramatically increase the execution speed of HPC workflows that generate a lot of data during runtime where a lot of it isn't required for analysing results. By utilising the local scratch, this data can typically be written to, and read from, quicker than network shared storage.

