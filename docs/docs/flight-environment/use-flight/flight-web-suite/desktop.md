# Flight Desktop Web

The Flight Desktop web application provides a visual front-end to the [Flight Desktop CLI tool](../flight-user-suite/flight-desktop/index.md), allowing users an intuitive solution to managing remote desktop sessions. 

![](img/flight_web_desktop_landing.png)

## Setting Preferences 

In the Flight Desktop web application it is possible to set some default configurations for desktops, such as, environment and resolution.

To do so, select the cog icon on the Flight Desktop web application landing page and perform changes.

![](img/flight_web_desktop_configure.png)

## Creating Desktop Session

### Quick Launch

By selecting "NEW DESKTOP" followed by "Quick launch" a desktop session will be created based on the preferences set for your user.

### Custom Desktop 

To launch a desktop session for the cluster, select "NEW DESKTOP" followed by "Custom desktop" from the management page then select the desired desktop environment to launch along with a name and resolution. 

![](img/flight_web_desktop_launch.png)

!!! note
    The only session types that will be displayed here are those that [have been prepared](../flight-user-suite/flight-desktop/prepare.md#preparing-a-type) 

After the user has set their options and selected launch, they will be connected to the session.

![](img/flight_web_desktop_vnc.png)

There are a few options for the desktop view, such as, making it _Full Screen_, changing to _Zen Mode_ (terminal focused with less widgets and buttons polluting the screen), disconnecting from the desktop session and terminating the session completely.

### A Note on Pasting

The desktop web suite does allow for remote & local clipboard integration. If text is copied on the remote session then it will be immediately available on the local clipboard.

For copying local data to the remote session a little bit of a workaround is needed:

- Copy text
- Click "Prepare Paste" in the desktop webapp (located in the top right of the screen)
    ![](img/flight_web_desktop_prepare_paste_select.png)
- Paste text into the pop up box, and click "ok"
    ![](img/flight_web_desktop_prepare_paste.png)
- Paste text in the remote session

## Managing Desktop Sessions

The home page for the Flight Desktop web application will present all existing desktop sessions for the user, from here sessions can be connected to or terminated through the corresponding buttons. Additionally, this session manager will generate previews of the various desktop sessions to make it easier to identify the different active sessions.

![](img/flight_web_desktop_landing_sessions.png)
