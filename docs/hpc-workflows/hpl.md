# HPL Benchmark Example

High Performance Linpack (HPL) is a synthetic benchmark, designed to solve a large mathematical problem on computers - including those with Distributed Memory, such as those within a cluster. It can be run on a single node to check performance and stress only that node. It can also be run over multiple nodes via an interconnect such as Infiniband or Ethernet - some of the steps below are only applicable to certain Interconnects.

It solves the problem in Double-Precision (64bit) arithmetic, which quickly stresses the Floating Point unit of a CPU along with the Memory subsystem and will normally show any hardware problems with a node quite quickly. When run across multiple nodes via an interconnect, it is useful for showing up errors on the fabric as poor performance will be exhibited and often accompanied with reported errors.

## Notes for running HPL

- Ensure that all System Event Logs are clear before commencing running of Memtester - you can use `service ipmi start && ipmitool -c 'sel clear'` to clear these logs.
- **Infiniband Only** - Ensure that the `ibcheckerrors` and `ibclearerrors` commands are used to check for any current errors and clear any previous errors reported on the Fabric.
- Calculate the correct settings for the HPL.dat file with [the HPL Calculator](http://hpl-calculator.sourceforge.net/) - Recommended settings are an NB size of 192 and a Memory usage of 88%.
- Use a Grid Shape (PxQ) with as close to "square" as possible, making Q slightly larger than P.
- For systems using an MPI version of 1.8.x or higher, ensure that the `mpirun` line includes the "--bind-to-core" parameter.
- **Infiniband Only** - Use the `ibcheckerrors` command to ensure that there are no issues with the fabric reported after running the HPL benchmark.

## Example Script 

The below example script is for 16 core, 64GB node with no IB Interconnect. The script is designed to be run with [SLURM](../hpc-environment-basics/hpc-usage/slurm/index.md).

```bash title="hpl.sh"
#!/bin/bash
# jobscript to run HPL benchmark

# Export environment and merge+set output file
#$ -j y -N HPL-1node -o /PATH/TO/JOB_DIR/HPL.$JOB_ID

module load mpi/openmpi # (1)!
echo $LD_LIBRARY_PATH

ldd xhpl

# change to directory
cd /PATH/TO/JOB_DIR/
mpirun -np 16 /PATH/TO/XHPL_INSTALL_DIR/xhpl # (2)!

```

1. This line loads `openmpi` using `modules`. It requires both `modules` and `openmpi` to be installed on the system. Doing so is outside of the scope of this documentation

2. This line executes `xhpl`, installation of which is currently outside of scope of this document

```text title="HPL.dat" 
HPLinpack benchmark input file
Innovative Computing Laboratory, University of Tennessee
HPL.out      output file name (if any)
6            device out (6=stdout,7=stderr,file)
2            # of problems sizes (N)
2560 81408   Ns
1            # of NBs
192          NBs
0            PMAP process mapping (0=Row-,1=Column-major)
1            # of process grids (P x Q)
4            Ps
4            Qs
16.0         threshold
1            # of panel fact
1 0 2        PFACTs (0=left, 1=Crout, 2=Right)
1            # of recursive stopping criterium
4 2          NBMINs (>= 1)
1            # of panels in recursion
2            NDIVs
1            # of recursive panel fact.
1 0 2        RFACTs (0=left, 1=Crout, 2=Right)
1            # of broadcast
0            BCASTs (0=1rg,1=1rM,2=2rg,3=2rM,4=Lng,5=LnM)
1            # of lookahead depth
0            DEPTHs (>=0)
2            SWAP (0=bin-exch,1=long,2=mix)
256          swapping threshold
1            L1 in (0=transposed,1=no-transposed) form
1            U  in (0=transposed,1=no-transposed) form
0            Equilibration (0=no,1=yes)
8            memory alignment in double (> 0)
```
