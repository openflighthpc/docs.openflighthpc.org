Usually SSH is used to navigate between systems in a HPC environment. This provides a secure shell connection to another host in order to access the CLI on that system. 

The first connection between two hosts will create a trust relationship. Depending on the user management solution for the HPC environment it may be possible to navigate between hosts without being prompted for a password or needing to specify a private key which would allow moving quickly and seamlessly between hosts and simplifying the running of large-scale jobs which involve multiple nodes. 

From the command line, a user can simply use the `ssh <node-name>` command to login to one of the compute nodes from the login node. For example, to login to a compute node named `node01` from the current host, use the command:
```bash
ssh node01
```

Use the command `logout` or `exit` (or press ++ctrl+d++) to exit the compute node and return to the previous host.
