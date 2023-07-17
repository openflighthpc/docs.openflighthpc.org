# Preparing a Desktop Type

## View Available Types

Your research environment supports many types of graphical session designed to provide interactive applications directly to users. To view the available types of session, use the command `flight desktop avail`:

```bash
[flight@chead1 (mycluster1) ~]$ flight desktop avail
┌───────┬──────────────────────────────────────────────────┬────────────┐
│ Name  │ Summary                                          │ State      │
├───────┼──────────────────────────────────────────────────┼────────────┤
│ gnome │ GNOME v3, a free and open-source desktop         │ Unverified │
│       │ environment for Unix-like operating systems.     │            │
│       │                                                  │            │
│       │  > https://www.gnome.org/                        │            │
│       │                                                  │            │
│ kde   │ KDE Plasma Desktop (KDE 4). Plasma is KDE's      │ Unverified │
│       │ desktop environment. Simple by default, powerful │            │
│       │ when needed.                                     │            │
│       │                                                  │            │
│       │  > https://kde.org/                              │            │
│       │                                                  │            │
│ xfce  │ Xfce is a lightweight desktop environment        │ Unverified │
│       │ for UNIX-like operating systems. It aims to be   │            │
│       │ fast and low on system resources, while still    │            │
│       │ being visually appealing and user friendly.      │            │
│       │                                                  │            │
│       │  > https://xfce.org/                             │            │
│       │                                                  │            │
└───────┴──────────────────────────────────────────────────┴────────────┘
[flight@chead1 (mycluster1) ~]$
```

Application types that are `unverified` need to be prepared before they can be started.

## Preparing a Type

To prepare a new session type, use the command `flight desktop prepare <type>` (preparing will automatically install any required application and support files, if these dependencies have been installed manually then a desktop session can be checked for verfication with `flight desktop verify <type>`). Once enabled, users can start a new session using the command `flight desktop start <type>`.

!!! note
    The `prepare` command is only available to the `root` user as it requires installation of packages

!!! note
    Preparing a new session type only enables it for the machine that you run the command from, any other nodes will need to have the type enabled too.

## Using sudo to prepare

Since only the root user can use `prepare`, you also cannot use `sudo` to run `prepare`.

Instead the user must become [the root user](../../../../hpc-environment-basics/linux-usage/cli-basics/becoming-root.md) and enable the [Flight system](../../environment-basics.md#activate-the-flight-environment) then run `prepare`.
