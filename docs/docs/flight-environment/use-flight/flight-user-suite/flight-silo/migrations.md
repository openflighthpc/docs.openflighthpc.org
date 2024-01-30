# Managing Migrations

Migrations provide a method for replicating [Silo software](./software.md) installations on new clusters. This supports quicker time-to-science by reducing the admin work required to create duplicate environments in ephemeral cloud situations. 

Every [software pull](./software.md#software-pull-name-version) made by the user will be recorded in an "archive". This will detail what software version was installed from what silos and to which directories it was installed. 

--- 

## `migration view`

Show the state of the current migration archives and any others available to the system.

- `--archive <archive>` - Specify the archive to view instead of the currently enabled one

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration view

    Archives:
    ┌──────────┬─────────┬───────────┐
    │ Archive  │ Status  │ Host Silo │
    ├──────────┼─────────┼───────────┤
    │ wooldbfe │ enabled │ Undefined │
    └──────────┴─────────┴───────────┘

    Enabled archive details:
    ┌──────────┬──────────┬─────────┬───────────────────────┬──────────┬────────────┐
    │ Type     │ Name     │ Version │ Path                  │ Absolute │ Silo Name  │
    ├──────────┼──────────┼─────────┼───────────────────────┼──────────┼────────────┤
    │ software │ OpenFOAM │ 22.12   │ ~/apps/OpenFOAM/22.12 │ false    │ openflight │
    └──────────┴──────────┴─────────┴───────────────────────┴──────────┴────────────┘
    ```

!!! note
    Software install destinations within home directories are portable between different users as they are not marked as "absolute" paths so, when migrating, will be installed into the home directory of whichever user is applying the migration 

---

## `migration apply`

Apply a migration archive to the current system. This will attempt to install the software within the archive to the recorded destinations. 

- `--archive <archive>` - Specify the archive ID to view instead of the currently enabled one
- `--ignore-missing-item` - Don't fail the apply if a silo, software package or version of a software package within the archive are not present
- `--overwrite` - Overwrite software locally if it already exists at the installation location

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration apply --archive qsaoxvxj
    Validating Archive 'qsaoxvxj'...
    Migration for archive 'qsaoxvxj' started...

    Migrating software my-software 1.0.0...
    'my-software' '1.0.0' successfully migrated


    Migrating software my-software 2.0.0...
    'my-software' '2.0.0' successfully migrated

    Migration All Done √
    ```

---

## `migration continue`

Resume monitoring of `software pull` actions.

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration continue
    Migration Monitoring Enabled √
    ```

---

## `migration pause`

Pause monitoring of `software pull` actions. After running this command any software installed with Silo will not be added to the currently enabled archive.

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration pause
    Migration Monitoring Disabled √
    ```

---

## `migration pull <archive>` 

Retrieve updated archive details from a silo. 

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration pull mysilo1
    Obtaining silo migration archives...
    Done √
    ```

--- 

## `migration push`

Update remote silos with latest local archive information. Archives are pushed to their "Host Silo", those without "Host Silos" are uploaded to the default silo.

- `--repo <silo>` - Specify a silo other than the default to store the local-only archives in

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration push --repo mysilo1
    Updating migration archives for Silo mysilo1...
    All Done √
    ```

---

## `migration remove software <name> <version>` 

Remove a software item from the current archive.

- `--archive <archive>` - Remove from the specified archive instead of the current one.
- `--all` - Remove the software version from all archives

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration remove software OpenFOAM 22.12
    Software 'OpenFOAM 22.12' migration record has been removed from archive 'wooldbfe'
    ```
---

## `migration switch`

Change from the currently enabled archive to a new, empty archive. 

- `--archive <archive>` - Instead of creating a new one, enable the specified archive

**Example 1**
: 
    ```
    [flight@gateway1 ~]$ flight silo migration switch
    Enabled archive has been switched to 'debkxnfs'.
    ```
