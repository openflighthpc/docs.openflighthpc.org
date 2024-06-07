### Storage Management

The cluster configures NFS for shared storage across the login and compute nodes. The default directories shared are as follows:

- `/home`: For user home directories
- `/opt/apps`: For installing shared applications
- `/opt/data`: For user project data
- `/opt/service`: For admin data and shared system configuration scripts
- `/opt/site`: For any other shared data or information on the cluster or site

### Adding IPA Users

!!! info 
    This section is only applicable if IPA was enabled during configuration and a server has had the `ipa` identity applied to it. It presume the system configured as an IPA server is called `infra01`.

A test user is automatically created to verify the installation of IPA is successful. This user can be logged into from the `infra01` machine as the root user with the key generated for the `testuser` (`ssh -i /root/.ssh/id_testuser testuser@gateway1`).

To add a new user:

1. Login to `infra01` as the root user
    1. This can be done by logging into `gateway1` as the user `flight` then switching to the root user (`sudo su -`) and then logging into `infra01`
1. Authorise as the IPA admin user (using the secure admin password set during configuration)
    ```bash
    kinit admin
    ```
1. Add the user along with a trusted SSH public key (this should be one that corresponds with a private key that the user has outside of the system)
    ```bash
    ipa user-add --cn="New User" --first=New --last=User newuser
    ```
1. Set a temporary password for the user (this will later be changed by the user once they've accessed the system, **this temporary password will need to be shared with the new user**)
    ```bash
    ipa passwd newuser
    ```
3. Add the user to the cluster users group to enable access
    ```bash
    ipa group-add-member cluster-users --users newuser
    ```

Once the user has successfully logged in, they will need to set a password for themselves to be able to access the [Flight Web Suite](../../flight-environment/use-flight/flight-web-suite/index.md). This can be done by them running `kinit newuser`, entering their temporary password and then following the prompts to set a new one.

For more information on managing users, see the [FreeIPA Admin guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_identity_management/managing-user-accounts-using-the-command-line_configuring-and-managing-idm).
