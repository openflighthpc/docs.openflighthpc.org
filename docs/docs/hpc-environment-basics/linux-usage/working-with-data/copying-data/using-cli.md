Usually a HPC environment will have a "login" or "gateway" node which is the entrypoint to the rest of the nodes. From outside of the HPC environment the data will need to be copied to this system (likely to shared storage) to make it available.

=== ":simple-linux: Linux / :simple-apple: Mac"

    Linux and Mac users can use in-built SSH support to copy files. 

    ```bash
    scp mydata.zip flight@52.48.62.34:/home/flight/ # (1)!
    ```

    1. Copy local file `mydata.zip` to `/home/flight/mydata.zip` on host `52.48.62.34` authenticating as the user `flight`.

=== ":simple-windows: Windows"

    Windows users can download and install the [pscp](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) command to perform the same operation (you may need your .pem key in .ppk format, see [connecting from Windows with Putty](../../cli-basics/logging-in.md)):

    ```bash
    pscp -i mykeyfile.ppk mydata.zip flight@52.48.62.34:/home/flight/ # (1)!
    ```

    1. Copy local file `mydata.zip` to `/home/flight/mydata.zip` on host `52.48.62.34` authenticating as the user `flight`.


!!! tip
    Both the `scp` and the `pscp` commands take the parameter `-r` to recursively copy entire directories of files to the research environment.

To retrieve files from the research environment, simply specify the location of the remote file first in the scp command, followed by the location on the local system to put the file.

