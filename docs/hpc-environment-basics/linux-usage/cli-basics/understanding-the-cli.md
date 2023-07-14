Usually a lot of HPC environment usage takes place via the Linux command line. For unfamiliar users here is a brief description of a typical CLI prompt.

```bash
[flight@chead1 (mycluster1) folder]$ echo Hello World!
Hello World!
```

- `flight` is the name of the user.
- `chead1` is the node the user is currently on.
- `(mycluster1)` is the name of the cluster being used. (This is specific to the [Flight Environment](/flight-enviromment/))
- `folder` is the directory the user is currently in. If this is a `~` then that means you are in your home directory.
- `$` indicates whether the user is a root user or normal user (root users see a `#`).
- `echo Hello World!` is a command that prints out "Hello World!". This is where commands you type will go.

