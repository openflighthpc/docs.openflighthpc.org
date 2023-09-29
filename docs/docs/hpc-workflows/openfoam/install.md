# Install OpenFOAM 

There are 3 different ways you can install OpenFOAM, each with varying levels of time to setup and complexity. The *Basic* setup is the fastest and integrates best with the Flight User Suite. The *Advanced* setup is for users that want more control, and can take over an hour on a 16 core machine.

=== "Basic :material-star::material-star-outline::material-star-outline:"

    1. Download and install OpenFlight OpenFOAM software using [Flight Silo](../../flight-environment/use-flight/flight-user-suite/flight-silo/index.md)
        ```bash
        flight silo software pull OpenFOAM 22.12 --repo openflight
        ```

    1. Install dependencies for visualisation.
        ```bash
        sudo dnf install -y paraview
        ```

    1. Install dependencies on all nodes.
        ```bash
        pdsh -g all 'sudo dnf install -y openmpi'
        ```

    1. Source the OpenFOAM environment and run a basic test. Make sure to change the source file path to the location of your installation. **Note that the `module` command will not be available to a shell session existing before the installation, logout and back in for it to be present** 
        ```bash
        module load mpi
        source apps/OpenFOAM/22.12/etc/bashrc
        foamTestTutorial -full incompressible/simpleFoam/pitzDaily
        ```

=== "Advanced :material-star::material-star::material-star-outline:"

    Firstly, become the root user, the added permissions are necessary for setup.
        ```bash
        sudo su -
        ```

    1. Install prerequisites
        ```bash
        dnf install gcc cmake boost fftw-devel paraview-devel paraview-openmpi-devel openmpi-devel flex m4 qt5-devel
        ```
    2. Make a directory for OpenFOAM in shared storage, so that the OpenFOAM build is available to all nodes in the cluster.
        ```bash
        cd /opt/apps
        mkdir OpenFOAM
        ```
    3. Obtain OpenFOAM Source.
        ```bash
        flight silo file pull openflight:openfoam/OpenFOAM-v2212.tar.gz
        tar xf OpenFOAM-v2212.tgz
        ```
    4. Compile it.
        ```bash
        cd OpenFOAM-v2212
        module load mpi
        source etc/bashrc

        foamSystemCheck # Check whether expected to work

        ./Allwmake -j -s -q -l # Compile on all cores
        ```
    5. Install dependencies for visualisation.
        ```bash
        dnf install -y paraview
        ```
    6. Install dependencies on all nodes.
        ```bash
        pdsh -g all 'dnf install -y openmpi'
        ```
    7. Test that the build works.
        ```bash
        foamTestTutorial -full incompressible/simpleFoam/pitzDaily
        ```
    !!!
        From this point being the root user is no longer necessary.

=== "Legacy :material-star::material-star-outline::material-star-outline:"

    1. Enable copr for OpenFOAM.
        ```bash
        sudo dnf -y copr enable openfoam/openfoam
        ```

    1. Install OpenFOAM, the OpenFOAM version selector, the additional sub-packages and paraview.
        ```bash
        sudo dnf install -y openfoam-selector
        sudo dnf install -y openfoam
        sudo dnf install -y openfoam2212-default
        sudo dnf install -y paraview
        ```

    1. Ensure that the correct version will be used with:
        ```bash
        openfoam-selector --set openfoam2212
        ```

    1. Refresh the shell by logging out and back in to make openfoam commands accessible.

        !!! note
            Make sure to do the above installation steps on **all** nodes in the cluster.

    1. Check an OpenFOAM command can be seen by viewing the help page:
        ```bash
        icoFoam -help
        ```
