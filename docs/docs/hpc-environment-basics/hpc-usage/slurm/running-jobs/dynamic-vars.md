# Dynamic Scheduler Variables

Your research environment job scheduler automatically creates a number of pseudo environment variables which are available to your job-scripts when they are running on research environment compute nodes, along with standard Linux variables. Useful values include the following:

- `$HOME` The location of your home-directory
- `%u` / `$USER` The Linux username of the submitting user. The `%u` substitution should only be used in your job scheduler filename directives.
- `$HOSTNAME` The Linux hostname of the compute node running the job
- `%a` / `$SLURM_ARRAY_TASK_ID` Job array ID (index) number. The `%a` substitution should only be used in your job scheduler filename directives[^1]
- `%A` / `$SLURM_ARRAY_JOB_ID` Job allocation number for an array job. The `%A` substitution should only be used in your job scheduler filename directives[^1]
- `%j` / `$SLURM_JOBID` Job allocation number. The `%j` substitution should only be used in your job scheduler filename directives

[More information on this.](https://slurm.schedmd.com/sbatch.html#SECTION_%3CB%3Efilename-pattern%3C/B%3E)

[^1]: These relate to task array jobs, which are covered in a later section.
