# Port Forwarding a Desktop Session

Depending on your connection to the HPC you may see this message when starting a desktop session:

```bash
This desktop session is not directly accessible from outside of your
cluster as it is running on a machine that only provides internal
cluster access.  In order to access your desktop session you will need
to perform port forwarding using 'ssh'.
```

For example in the following:

```bash
[flight@chead1 (mycluster1) ~]$ flight desktop start gnome
Starting a 'gnome' desktop session:

   > ✅ Starting session

A 'gnome' desktop session has been started.

== Session details ==
      Name:
  Identity: dd8acf76-1494-4c88-adb1-a8bbd405d965
      Type: gnome
   Host IP: 20.68.202.163
  Hostname: chead1
      Port: 5903
   Display: :3
  Password: WB3gUQMW
  Geometry: 1024x768

This desktop session is not directly accessible from outside of your
cluster as it is running on a machine that only provides internal
cluster access.  In order to access your desktop session you will need
to perform port forwarding using 'ssh'.

Refer to 'flight desktop show dd8acf76' for more details.

If prompted, you should supply the following password: WB3gUQMW
```

By running the command `flight desktop show <name>` we can see more information

```bash
[flight@chead1 (mycluster1) ~]$ flight desktop show dd8acf76

== Session details ==
      Name:
  Identity: dd8acf76-1494-4c88-adb1-a8bbd405d965
      Type: gnome
   Host IP: 20.68.202.163
  Hostname: chead1
      Port: 5903
   Display: :3
  Password: WB3gUQMW
  Geometry: 1024x768

This desktop session is not directly accessible from outside of your
cluster as it is running on a machine that only provides internal
cluster access.  In order to access your desktop session you will need
to perform port forwarding using 'ssh':

  ssh -L 5903:20.68.202.163:5903 flight@

Once the ssh connection has been established, depending on your
client, you can connect to the session using one of:

  vnc://flight:WB3gUQMW@localhost:5903
  localhost:5903
  localhost:3

If, when connecting, you receive a warning as follows, try again with
a different port number, e.g. 5904, 5905 etc.:

  channel_setup_fwd_listener_tcpip: cannot listen to port: 5903

If prompted, you should supply the following password: WB3gUQMW
```

=== ":simple-windows: Windows"

    On Windows, the desktop environment can still be connected like so:

    1. Begin your environment as demonstrated on the previous page.

    2. Note down the IP address, port number and password.

    3. Open PuTTy, or get it from the [prerequisites](../../../../overview/prerequisites.md) page and then open it.

    4. Load one of your saved sessions or save a new session with your log in details.

        ![](img/putty_load_session.png)

    5. Find the "Category:" section on the left of the window

        1. Scroll down to "Connection" and expand it.
        2. Scroll down to "SSH" and expand it.
        3. Click on the "Tunnels page.

            ![](img/tunnels_page.png)

    6. Input the source port (a local port) and destination which is `IP address:port number` of the desktop environment that was started.

        ![](img/source_and_destination.png)

    7. After inputting the information, click "Add" and the details will move to a box above.

        ![](img/tunnels_add_button.png)

    8. Scroll back to the top of the "Category:" section, and click on "Session"

        ![](img/save_session.png)

    9. Save the session and then click open to run the command line interface and log in.

    11. Open your VNC client, and type `localhost:XXXXX` where `XXXX` is the source port number you entered earlier.

        ![](img/vnc_client_local.png)

    12. Click "Connect", and if prompted enter the password you noted down.

=== ":simple-linux: Linux / :simple-apple: Mac"

    The steps for connecting with Linux/Mac are outlined in the output of the `flight desktop show` command above.
