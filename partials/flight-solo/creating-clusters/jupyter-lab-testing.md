1. Put the IP/FQDN used in configuration into your browser to access the [Flight Web Suite](../../flight-environment/use-flight/flight-web-suite/). It should look something like this:
    ![](img/websuite_home_jupyter.png)

1. Under "Quick Access" click on "Jupyter" and enter the password set during configuration when requested; it will only need to be entered the first time you connect.
    ![](img/websuite_jupyter_password.png)

1. On the Jupyter home page, under the "Notebook" section, click on "Python3" to open a new notebook.
    ![](img/websuite_jupyter_newpython.png)

1. Enter this code, which will print out a message, wait for a bit, then print again.
    ```python
    import time
    print("Starting running on Jupyter")
    time.sleep(3)
    print("Finished running - goodbye from Jupyter")
    ```
    ![](img/websuite_jupyter_code.png)

1. Click the play button to run the cell, and wait for the result.

