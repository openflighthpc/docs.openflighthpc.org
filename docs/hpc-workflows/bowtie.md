# Bowtie Workflow Example

Bowtie is a sequencing tool-set for aligning sets of DNA into large genomes.

## Workflow

### Installing Bowtie with Spack

!!! note
    The flight environment will need to be activated before the environments can be created so be sure to run `flight start` or [setup your environment to automatically activate the flight environment](../flight-environment/use-flight/environment-basics.md#activating-the-flight-system).

1. Create a spack software environment:
    ```bash
    [flight@chead1 (mycluster1) ~]$ flight env create spack
    ```
1. Activate the environment:
    ```bash
    [flight@chead1 (mycluster1) ~]$ flight env activate spack
    ```
1. Install bowtie:
    ```bash
    <spack> [flight@chead1 (mycluster1) ~]$ spack install bowtie
    ```

### Running a Bowtie Job

1. Download example ecoli data:
    ```bash
    <spack> [flight@chead1 (mycluster1) ~]$ flight silo file pull openflight:bowtie/ecoli.fq
    ```
1. Download an example job script to run in the current working directory:
    ```bash
    <spack> [flight@chead1 (mycluster1) ~]$ flight silo file pull openflight:bowtie/ecoli-job.sh
    ```
1. Submit the job to the queue:
    ```bash
    <spack> [flight@chead1 (mycluster1) ~]$ sbatch ecoli-job.sh
    ```

The results can then be reviewed from the slurm output file for the job in the current working directory.
