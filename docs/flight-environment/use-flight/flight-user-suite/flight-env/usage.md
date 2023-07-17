# Flight Env Command Usage

## Viewing Available Ecosystems

Various [package-ecosystems](ecosystems/index.md) are available for managing software on your research environment. These can be viewed by using the `env` subcommand:

```bash
flight env avail
```

## Creating a Local Ecosystem

A local ecosystem is only available to the user that creates it. All of the packages and libraries are installed to the users home directory.

To install a package ecosystem, use the create command as follows (replacing easybuild with your desired package ecosystem):

```bash
flight env create easybuild
```

Once a package ecosystem has been installed, it needs to be activated for the session to be able to manage software with it:

```bash
[flight@chead1 (mycluster1) ~]$ flight env activate easybuild
<easybuild> [flight@chead1 (mycluster1) ~]$
```
!!! tip
    Your preferred software ecosystem can be set to automatically activate for your user within the flight system by running `flight env set-default easybuild`, replacing easybuild with your chosen software ecosystem

## Creating a Global Ecosystem

A global ecosystem is available to all users on the system. All of the packages and libraries are installed to a shared storage directory. The global directories can be configured in `/opt/flight/opt/env/etc/config.yml` with the `global_depot_path:` and `global_build_cache_path` keys.

!!! note
    The user requires suitable write permissions to the configured global depot paths in order to be able to create a global ecosystem

To install a global package ecosystem, use the create command with the global option flag:

```bash
flight env create -g easybuild
```

Once the global ecosystem has been installed, it needs to be activated for the session to be able to monitor software with it:

```bash
[root@chead1 (mycluster1) ~]$ flight env activate easybuild@global
<easybuild@global> [flight@chead1 (mycluster1) ~]$
```

## Custom Ecosystem Names


When installing an ecosystem, a custom alias can be added by appending `@mycustomname` to the end of creation command. For example, to create a local gridware installation with the alias `test`:

```bash
flight env create easybuild@test
```

To activate this environment, the alias will need to be specified in the activation command:

```bash
[flight@chead1 (mycluster1) ~]$ flight env activate easybuild@test
<easybuild@test> [flight@chead1 (mycluster1) ~]$
```
