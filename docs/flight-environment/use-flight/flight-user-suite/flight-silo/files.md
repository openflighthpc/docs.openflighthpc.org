# Managing Files

Silo provides simple file management, this allows users to save and restore their files 

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
