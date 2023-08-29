# Viewing and Terminating Sessions

Users can view a list of the currently running sessions by using the command `flight desktop list`.

```bash
[flight@chead1 (mycluster1) ~]$ flight desktop list
┌──────┬──────────┬───────┬───────────┬───────────────┬────────────────┬──────────┬────────┐
│ Name │ Identity │ Type  │ Host name │ IP address    │ Display (Port) │ Password │ State  │
├──────┼──────────┼───────┼───────────┼───────────────┼────────────────┼──────────┼────────┤
│      │ 4549eae1 │ gnome │ chead1    │ 20.68.202.163 │ :1 (5901)      │ mkO3Zxjl │ Active │
│      │ 52e44bdd │ gnome │ chead1    │ 20.68.202.163 │ :3 (5903)      │ 5eAlaST0 │ Active │
│      │ abbbe30b │ gnome │ chead1    │ 20.68.202.163 │ :2 (5902)      │ XLH7bV30 │ Active │
└──────┴──────────┴───────┴───────────┴───────────────┴────────────────┴──────────┴────────┘
```

To display connection information for an existing session, use the command `flight desktop show <session-ID>`. This command allows users to review the IP-address, port number and one-time password settings for an existing session.

```bash
[flight@chead1 (mycluster1) ~]$ flight desktop show 4549eae1

== Session details ==
      Name:
  Identity: 4549eae1-6f8b-4983-8057-99b378afcdd3
      Type: gnome
   Host IP: 20.68.202.163
  Hostname: chead1
      Port: 5901
   Display: :1
  Password: mkO3Zxjl
  Geometry: 1024x768

This desktop session is not directly accessible from outside of your
cluster as it is running on a machine that only provides internal
cluster access.  In order to access your desktop session you will need
to perform port forwarding using 'ssh':

  ssh -L 5901:20.68.202.163:5901 flight@

Once the ssh connection has been established, depending on your
client, you can connect to the session using one of:

  vnc://flight:mkO3Zxjl@localhost:5901
  localhost:5901
  localhost:1

If, when connecting, you receive a warning as follows, try again with
a different port number, e.g. 5902, 5903 etc.:

  channel_setup_fwd_listener_tcpip: cannot listen to port: 5901

If prompted, you should supply the following password: mkO3Zxjl
```

Users can terminate a running session by ending their graphical application (e.g. by logging out of a Gnome session, or exiting a terminal session), or by using the `flight desktop kill <session-ID>` command. A terminated session will be immediately stopped, disconnecting any users.

```bash
flight desktop kill 4549eae1
```
