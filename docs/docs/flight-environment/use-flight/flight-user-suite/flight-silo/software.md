# Managing Software

Software in the context of Flight Silo is software binaries that can be compiled in advance, and then kept in a silo so that they can be accessed from any number of HPC environments without needing to be recompiled. This provides users a method to manage and share their own software.

This page describes several commands associated with software which are run in the format `flight silo <command> --<option>`.

---

## `software delete <name> <version>`

Delete a software binary from the default silo.

- `--repo <silo>` - Instead of using the default silo, specify which one to delete from.

**Example 1**
: 
    ```
    [flight@chead1 ~]$ flight silo software delete exampl 0.0
    Deleting software 'exampl' version '0.0'...
    Deleted software 'exampl' version '0.0'.
    ```

---

## `software pull <name> <version>`

Download and extract a software binary from the default silo.

- `--repo <silo>` - Instead of using the default silo, specify which one to pull from.
- `--dir <path>` - Install software within `<path>` instead of the standard location. The order in which the destination path is decided is based on the following (in priority order):
    1. The value of the environment variable `flight_SILO_software_dir`
    1. The `--dir` argument
    1. The value of `software_dir` in `~/.config/flight/silo/config.yml`
    1. The value of `software_dir` in `/opt/flight/opt/silo/config.yml` (this path may differ if a non-standard installation location has been chosen or if the source code has been cloned elsewhere) 
- `--overwrite` - Overwrite local software if it exists.

**Example 1**
: 
    ```
    [flight@chead1 ~]$ flight silo software pull exampl 0.0
    Downloading software 'exampl' version '0.0'...
    Extracting software to '/home/flight/.local/share/flight/silo/software'...
    Extracted software 'exampl' version '0.0 to '/home/flight/.local/share/flight/silo/software'...
    ```

---

## `software push <file> <name> <version>`

Upload a software binary to the default silo.

- `--repo <silo>` - Instead of using the default silo, specify which one to push to.
- `--force` - Overwrite existing software in the silo if it exists.

**Example 1**
: 
    ```
    [flight@chead1 ~]$ flight silo software push exampl.tar.gz exampl 0.0
    Uploading software 'exampl' version '0.0'...
    Uploaded software 'exampl' version '0.0'.
    ```

---

## `software search <name>`

List the software binaries in the default silo. If no name is given, then all software will be displayed.

- `--repo <silo>` - Instead of using the default silo, specify which one to search on.

**Example 1 - With Search Term (Shows Versions)**
: 
    ```
    [flight@chead1 ~]$ flight silo software search exampl
    ┌────────┬─────────┬────────┐
    │ Name   │ Version │ Size   │
    ├────────┼─────────┼────────┤
    │ exampl │ 0.0     │ 500 MB │
    └────────┴─────────┴────────┘
    ```

**Example 2 - With No Search Term**
: 
    ```
    [flight@chead1 ~]$ flight silo software search
    Showing latest 5 versions...
    ┌────────┬─────────┐
    │ Name   │ Version │
    ├────────┼─────────┤
    │ exampl │ 0.0     │
    └────────┴─────────┘
    ```
