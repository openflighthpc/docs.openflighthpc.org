# Flight Silo Overview 

Flight Silo allows users to connect to "silos" - cloud storage systems designed primarily to distribute software and projects, with more general file storage also available. Silo comes installed as part of the User Suite included with Flight Solo.

This section details the various commands used to manage silos, files and software.

## Setting up platforms

Use `flight silo type avail` to list all available platform types and their current state. e.g.
```bash
[flight@chead1 ~]$ flight silo type avail
┌───────────┬───────────────────────────────┬──────────┐
│ Name      │ Description                   │ Prepared │
├───────────┼───────────────────────────────┼──────────┤
│ aws       │ Amazon Simple Storage Service │ true     │
│ openstack │ Openstack Swift Storage       │ true     │
└───────────┴───────────────────────────────┴──────────┘
```

Types are not prepared by default. To prepare a type you must [become a root user](../../environment-basics.md#activate-the-flight-environment), and then do `flight silo type prepare <type>`. e.g.
```bash
[root@chead1 ~]# flight silo type prepare aws
Preparing...
Type aws prepared for use
```

Types are the backend providers of storage, and each type can hold multiple silos. Silos are used to hold software and files. To find out more about these see the relevant page in this section, or use the command `flight silo help` to view available commands and command syntax.
