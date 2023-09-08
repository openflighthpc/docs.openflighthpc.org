# Resizing a Desktop Session

When launching a graphical desktop session using the `flight desktop` utility, a session resolution can be specified using the `--geometry <size>` option. For example, to launch a `gnome` desktop session with a resolution of 1920x1080 pixels, use the command:

```
flight desktop start --geometry 1920x1080 gnome
```

By default, your graphical desktop session will launch with a compatibility resolution of 1024x768. For example, to change the default resolution to 1920x1080 pixels, use the command:
```
flight desktop set geometry 1920x1080
```

Users can resize the desktop to fit their screens using the command `flight desktop resize <session id> <resolution>`. For example:
```
flight desktop resize 4549eae1 1920x1080
```

Your graphical desktop session will automatically resize to the new resolution requested. Use your local VNC client application to adjust the compression ratio, colour depth and frame-rate sessions in order to achieve the best user-experience for the desktop session.
