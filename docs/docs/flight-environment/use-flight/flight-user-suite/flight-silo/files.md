# Managing Files

Silo provides simple file management, this allows users to save and restore their files 

## `file list <silo>:<directory>`

List the files in the given silo and directory. If no silo is specified then the default will be used. If no directory is given then the top-level of the silo file storage will be shown. 

**Example 1**
: 
    ```bash
    [flight@chead1 ~]$ flight silo file list openflight:/openfoam
    cavity-example.sh
    motorBike.tar.gz
    ```

---

## `file push <source> <silo>:<destination>`

Upload a file to a silo.If no silo is specified then the default will be used.

- `--recursive` - Uploads a whole directory and all of its contents. You must specify a directory rather than a file.
- `--make-parent` - Create parent directories if they don't exist.

**Example 1**
:    
    ```bash
    [flight@chead1 ~]$ flight silo file push example.sh
    Local file '/home/flight/example.sh' copied to remote '/example.sh'
    ```

**Example 2**
: 
    ```bash
    [flight@chead1 ~]$ flight silo file push dir/subdir/example.sh --make-parent
    Local file '/home/flight/example.sh' copied to remote '/dir/subdir/example.sh'
    ```

---

## `file pull <silo>:<destination> <local destination>`

Pull a file or directory from a silo. If no silo is specified then the default will be used. If no local destination is specified then the current working directory will be used.

- `--recursive` - Pulls a whole directory and all of its contents. 

**Example 1**
: 
    ```bash
    [flight@chead1 ~]$ flight silo file pull openflight:/kubernetes/pod-launch-test.yaml
    Pulling 'openflight:/kubernetes/pod-launch-test.yaml' into '/home/flight'...
    File(s) downloaded to /home/flight
    ```

**Example 2**
: 
    ```bash
    [flight@aztest1 ~]$ flight silo file pull --recursive openflight:/openfoam/ openfoam-download-example
    Pulling 'openflight:/openfoam/' into 'openfoam-download-example'...
    File(s) downloaded to openfoam-download-example
    ```

---

## `file delete <silo>:<destination>`

Delete a file in a silo. If no silo is specified then the default will be used.

- `--recursive` - Deletes a whole directory and all of its contents. You must specify a directory rather than a file.

**Example 1**
: 
    ```bash
    [flight@chead1 ~]$ flight silo file delete example.sh
    Deleting remote file 'example.sh'...
    Deleted remote file 'example.sh'
    ```
