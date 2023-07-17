# What is the Flight Environment?

The Flight Environment generally encompasses the tools in the OpenFlight project. 

The tools developed by OpenFlight are designed to work independently but are more powerful when used in conjuction with one another as they each aim to address small areas of HPC environment usage. 

The Flight Environment broadly consists of:

- **Flight User Suite** - A collection of CLI tools aimed to improve general HPC environment access by streamlining common workflow tasks. Things like launching desktop sessions, adding software ecosystems and managing object storage.
- **Flight Web Suite** - A web front-end aimed at HPC end-users to get them accessing their HPC environment as easily as possible. This is done by providing a web experience that gives them access to terminals, desktops and files on the system. 
- **Flight Admin Tools** - A collection of CLI tools aimed at admins to aid with common HPC environment configuration, such as, gathering system information, building an inventory of systems and applying configuration to the cluster. 

## Who is it for? 

**The Flight User Suite is designed for use by end-users** - that's the scientists, researchers, engineers and software developers who actually run compute workloads and process data. This documentation is designed to help these people to get the best out this environment, without needing assistance from teams of IT professionals. Flight provides tools which enable users to service themselves - it's very configurable, and can be expanded by individual users to deliver a scalable platform for computational workloads.

## Flight User Suite

The Flight User Suite sits unobtrusively on the research environment by default, the tools will not be accessible until the [environment is activated](use-flight/environment-basics.md#activate-the-flight-environment). 

The Flight User Suite consists of: 

- **Runway** - A self-contained Ruby environment and an entrypoint for accessing the other flight tools
- **Starter** - Profile scripts for integrating the user suite into the shell environment, giving easy access to all Flight Environment tools
- **Desktop** - An intuitive tool for launching VNC-ready virtual desktops of many different desktop environments (gnome, xterm, kde, etc)
- **Env** - Access to, and management of, various software managers to ensure access to a wide variety of HPC applications
- **Silo** - Management of object-based storage for managing files and software, providing a simple interface to user data
- **Job** - Create and manage customized job scripts from predefined templates, launch jobs and monitor their activity

## Flight Web Suite

The Flight Web Suite consists of: 

- **WWW** - A self-contained web-server for accessing Web Suite applications
- **Login** - User access management, integrated with system authentication to allow users to securely access the Web Suite
- **Console** - A web-based terminal giving CLI access to the system running the Web Suite
- **Desktop** - Create and manage remote desktop sessions on the HPC environment
- **File Manager** - Access to user files, providing a simple way to upload and download data directly into the user environment
- **Job** - Create and manage customized job scripts and their execution

## Flight Admin Tools

The Flight Admin Tools are:

- **Gather** - Collect and store system information
- **Hunter** - Send system information and manage a host inventory over the network
- **Profile** - Apply configuration identities to hosts in a HPC environment 
- **PDSH** - OpenFlight's build of PDSH

## What Should Be Here?

This should probably have sections for: 

- General Usage (descriptions of subcommands with usage) 
    - User Suite
    - Web Suite
    - Admin Tools
