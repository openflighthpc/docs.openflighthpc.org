1. Create a file called `simplejobscript.sh`, and copy this into it:
    ```
    #!/bin/bash -l
    echo "Starting running on host $HOSTNAME"
    sleep 30
    echo "Finished running - goodbye from $HOSTNAME"
    ```

2. Run the script with `sbatch simplejobscript.sh`, and to test all your nodes try queuing up enough jobs that all nodes will have to run.

3. In the directory that the job was submitted from there should be a `slurm-X.out` where `X` is the Job ID returned from the `sbatch` command. This will contain the echo messages from the script created in step 1 
