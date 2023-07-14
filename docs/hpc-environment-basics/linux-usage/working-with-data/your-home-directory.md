Linux automatically places users in their home-directory when they login to a node. By default, Linux will create your home-directory under the `/home/` directory, named `flight` (`/home/flight`). However, on some systems the home directory location may differ.

The Linux command line will accept the `~` (tilde) symbol as a substitute for the currently logged-in users’ home-directory. The environment variable `$HOME` is also set to this value by default. Hence, the following three commands are all equivalent when logged in as the user flight:

- `ls /home/flight`
- `ls ~`
- `ls $HOME`

The root user in Linux has special meaning as a privileged user, and usually does not have a shared home-directory across a research environment. The root account on all nodes is likely to have a home-directory in `/root`, which is separate for every node. For security reasons, users are not permitted to login to a node as the root user directly - please login as a standard user and use the `sudo` command to get privileged access.
