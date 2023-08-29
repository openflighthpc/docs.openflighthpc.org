# Installing the Flight Environment

The OpenFlight project packages tools as both RPMs and debs that are hosted in package repositories which can be quickly installed with a couple of commands.

## Setting Up The Repository

=== ":simple-centos: EL7"

    - Install the OpenFlight release RPM:
        ```bash
        sudo yum install https://repo.openflighthpc.org/pub/centos/7/openflighthpc-release-latest.noarch.rpm
        ```
    - Rebuild the yum cache:
        ```bash
        sudo yum makecache
        ```
    - Most tools require packages available in the EPEL repository, installing it is recommended:
        ```
        sudo yum install epel-release
        ```

=== ":simple-rockylinux: EL8"

    - Install the OpenFlight release RPM:
        ```bash
        sudo dnf install https://repo.openflighthpc.org/openflight/centos/8/x86_64/openflighthpc-release-3-1.noarch.rpm
        ```
    - Add the Power Tools repository:
        ```bash
        sudo dnf config-manager --set-enabled powertools
        ```
    - Most tools require packages available in the EPEL repository, installing it is recommended:
        ```bash
        sudo dnf install epel-release
        ```
    - Finally, rebuild the dnf cache:
        ```bash
        sudo dnf makecache
        ```

=== ":simple-rockylinux: EL9"

    - Install the OpenFlight release RPM:
        ```bash
        sudo dnf install https://repo.openflighthpc.org/openflight/centos/9/x86_64/openflighthpc-release-3-1.noarch.rpm
        ```
    - Add the Code Ready Builder repository:
        ```bash
        sudo dnf config-manager --set-enabled crb
        ```
    - Most tools require packages available in the EPEL repository, installing it is recommended:
        ```bash
        sudo dnf install epel-release
        ```
    - Finally, rebuild the dnf cache:
        ```bash
        sudo dnf makecache
        ```

=== ":simple-ubuntu: Ubuntu 22.04"

    - Import the public signature for OpenFlight:
        ```bash
        sudo apt-key adv --fetch-keys https://repo.openflighthpc.org/openflighthpc-archive-key.asc
        ```
    - Install the OpenFlight repository:
        ```bash
        sudo apt-add-repository "deb https://repo.openflighthpc.org/openflight/ubuntu stable main"
        ```
    - Update the apt cache:
        ```bash
        sudo apt-get update
        ```

!!! info
    There are 3 repositories available - **production** (enabled by default), **dev** (providing development releases of tools) and **vault** (access to old, unsupported versions and retired tools).

## Installing the Tools

### Flight User Suite

The quickest and simplest way to get up and running with the user suite is to install the group package for the tools. This will ensure that compatible versions of all the tools are installed.

=== ":simple-centos: EL7"

    - Install the user suite group package
        ```bash
        sudo yum install flight-user-suite
        ```

=== ":simple-rockylinux: EL8/EL9"

    - Install the user suite group package
        ```bash
        sudo dnf install flight-user-suite
        ```

=== ":simple-ubuntu: Ubuntu 22.04"

    - Install the user suite group package
        ```bash
        sudo apt-get install flight-user-suite
        ```

!!! note
    After installation, logout and back in again to expose the `flight` command to the shell


### Flight Web Suite

Flight Web Suite consists of multiple packages so the simplest way to get going with it is to install the group package. Some elements of the Web Suite are dependent on tools in the User Suite and will pull those packages in if the User Suite is not already installed. 


=== ":simple-centos: EL7"

    - Install the web suite group package
        ```bash
        sudo yum install flight-web-suite
        ```
    - Install extra optional packages 
        ```bash
        sudo yum install python-websockify xorg-x11-apps netpbm-progs
        ```

=== ":simple-rockylinux: EL8/EL9"

    - Install the web suite group package
        ```bash
        sudo dnf install flight-web-suite
        ```
    - Install extra optional packages 
        ```bash
        sudo dnf install python-websockify xorg-x11-apps netpbm-progs
        ```

=== ":simple-ubuntu: Ubuntu 22.04"

    - Install the web suite group package
        ```bash
        sudo apt-get install flight-web-suite
        ```
    - Install extra optional packages 
        ```bash
        sudo apt-get install netpbm x11-apps websockify
        ```


### Flight Admin Tools

The Flight Admin Tools exist separately and can be installed by name from the repositories. The packages are: 

- `flight-gather`
- `flight-hunter`
- `flight-profile`
- `flight-pdsh`

=== ":simple-centos: EL7"

    - Install the desired tool
        ```bash
        sudo yum install PACKAGE
        ```

=== ":simple-rockylinux: EL8/EL9"

    - Install the admin tools
        ```bash
        sudo dnf install PACKAGE
        ```

=== ":simple-ubuntu: Ubuntu 22.04"

    - Install the admin tools
        ```bash
        sudo apt-get install PACKAGE
        ```
