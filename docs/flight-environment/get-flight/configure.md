# Configuring the Flight Environment

## General Flight Environment 

### Config Commands

Some basic aspects of the flight environment can be set from the CLI. 

#### Global Configuration

Global environment configuration can be set through the `flight config` command. This command provides the ability to get, set and list the global environment configuration. 

The command can be run as follows: 
```bash
flight config set NAME VALUE
```

Some common global configuration options are:

- `cluster.name` - The name of the cluster for the HPC environment, this will be visible in the command prompt
- `pdsh.priority` - Set the priority of pdsh/nodeattr commands

#### User Configuration 

The `flight set` command is used to modify the flight environment within your user scope to work as you'd like it to by enabling/disabling different features. 

The command can be run as follows: 
```bash
flight set OPTION [on|off]
```

Where the `OPTION` can be:

- `hints`-  Show or hide command hints on login
- `welcome` - Show or hide the welcome splash screen on login
- `secondary` - Toggle whether the flight environment should be loaded in subshells
- `always` - Toggle whether the flight environment is activated 

Further information can be found with the command `flight info`.

!!! tip
    If you have [root permissions](../../hpc-environment-basics/linux-usage/cli-basics/becoming-root.md) then the option `--global` can be appended to the `flight set` command to modify the default settings for all users

### Filesystem Structure

When installed from the packages, the Flight Environment stores everything under `/opt/flight` (referenced as the `flight_ROOT`). This directory mirrors the [Linux Filesystem Hierarchy Standard](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard). 

Briefly, the `flight_ROOT` consists of: 

- `bin/` - Flight environment entrypoint commands 
- `etc/` - Flight environment configuration files
- `lib/` - Libraries and script
- `libexec/` - Hooks and scripts for the flight tools
- `opt/` - Installation location for flight tools 
- `usr/` - User content and resources
- `var/` - Additional libraries and log files

Generally speaking, configuration files for the flight environment can be found under `etc/` in the `flight_ROOT` or through the configuration directories of specific tools in `opt/TOOL_NAME/etc/` within `flight_ROOT`. 

!!! tip
    Every flight tool provides a breakdown of the available configuration options and how to set them either through their README or in a `etc/config.yml.ex` file in the source repository. 

    For example, available configuration options for version 1.11.3 of flight desktop can be found at [https://github.com/openflighthpc/flight-desktop/blob/1.11.3/etc/config.yml.ex](https://github.com/openflighthpc/flight-desktop/blob/1.11.3/etc/config.yml.ex)

