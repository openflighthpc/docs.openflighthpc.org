# Manage Users

!!! info
    This section covers managing users with IPA. An IPA server (`infra01`) is only configured in the _Medium_ and _Large_ [Core Infrastructure](launch-core-infra.md) deployments therefore this documentation is not suitable for reference with _Small_ Core Infrastructure deployments.

## Testing Access 

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star-outline: :material-star-outline: :material-star-outline: :material-star-outline:
</div>

A test user is automatically created to verify the installation of IPA is successful. This user can be logged into from the `infra01` machine as the root user with the key generated for the `testuser` (e.g. `ssh -i /root/.ssh/id_testuser testuser@login1`).

## Adding a User

<div class="grid cards" markdown>
- **Difficulty:** :material-star: :material-star: :material-star-outline: :material-star-outline: :material-star-outline:
</div>

1. Login to `infra01` as the root user
    1. This can be done by logging into `login1` as the user `flight` then switching to the root user (`sudo su -`) and then logging into `infra01`
1. Authorise as the IPA admin user (using the generated admin password available in `/root/ipa_admin_pass.txt` on `login1`)
    ```bash
    kinit admin
    ```
1. Add the user 
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

Once the user has successfully logged in, they will need to set a password for themselves to be able to access the [Flight Web Suite](../../../../flight-environment/use-flight/flight-web-suite/index.md). This can be done by them running `kinit newuser`, entering their temporary password and then following the prompts to set a new one.

For more information on managing users, see the [FreeIPA Admin guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_identity_management/managing-user-accounts-using-the-command-line_configuring-and-managing-idm).
