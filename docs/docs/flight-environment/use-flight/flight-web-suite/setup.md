# Setting Up Flight Web Suite

## System Prerequisites

In order to authenticate the user in the web interface, the following must be true:

- User has a password (can be set with the `passwd` command or through other user management software that is setup on the system)
- Ports 80 & 443 on the gateway must be accessible (allowed through both the system firewall and cloud security group)
- SSH password authentication must be enabled (can be set in `/etc/ssh/sshd_config` in CentOS or through other access management software that is setup on the system)

## Setting Domain Name

The domain name is what the Web-Suite will be accessed through, either a hostname or ip address. It is also used for certificate generation, and a publicly accessible value should be used if intending to use Lets Encrypt certificates.

Set the domain name:
```bash
flight web-suite set-domain chead1.mycluster1.example.com
```

Restart the web-suite to apply changes:
```bash
flight web-suite restart
```

## Certificate Preparation

To secure the server connections, it is recommended to generate a certificate to be used by the web suite. The Flight Web Suite comes with tools that can generate either a "self-signed" or LetsEncrypt certificate. Alternatively, a certificate that has been created outside of the web suite can be used to secure the server.

=== "Self-Signed"

    A self-signed certificate, whilst not usually trusted by browsers, does still provide extra security to the web server over HTTP communication.

    A self-signed certificate is automatically created when setting the domain name. To generate and install the self-signed certificates, simply:

    ```bash
    flight www cert-gen --cert-type self-signed --domain $(flight web-suite get-domain)
    ```

    !!! note
        If `--domain` is omitted, a sensible default is selected. The default is taken from either the last `--domain` value given to `flight www cert-gen` or the last value given to `flight web-suite set-domain`. If neither of those have been given, the command will complain, and the domain will need to be specified.

    !!! note
        If `--cert-type` is omitted a sensible default is selected. The default is taken from the last `--cert-type` value given to `flight www cert-gen` or `self-signed` if none has been given before.

    After this has run, changes are applied on a service restart:

    ```bash
    flight web-suite restart
    ```

=== "Lets Encrypt"

    To generate and install a Lets Encrypt certificate, run the following (replacing the domain and email with appropriate values):
    ```bash
    flight www cert-gen --cert-type lets-encrypt --domain <chead1.mycluster1.example.com> --email <user@example.com>
    ```

    !!! note
        If `--domain` is omitted, a sensible default is selected. The default is taken from either the last `--domain` value given to `flight www cert-gen` or the last value given to `flight web-suite set-domain`. If neither of those have been given, the command will complain, and the domain will need to be specified.

    !!! warning
        Ensure that the domain/IP is publicly accessible in order for certificate generation to work

    The Let's Encrypt certificate is only valid for a limited time. Depending on how long a cluster is intended to live for, it may be useful to install a cron job to automate renewing the certificate.

    ```bash
    flight www cron-renewal
    ```

    The cronjob can be removed by running:

    ```bash
    flight www cron-renewal --disable
    ```

    After this has run, changes are applied on a service restart:
    ```bash
    flight web-suite restart
    ```

=== "External Certificate"

    Externally generated certificates can be used by instructing `www` to install them, to do this you will need:

    - `fullchain.pem`: The full certificate 
    - `privkey.pem`: The private key for the certificate 

    Once you've obtained these files and placed them on the host, add them with:

    ```bash
    flight www cert-install /path/to/privkey.pem /path/to/fullchain.pem
    ```

    If the Web Suite was already running then restart it with:

    ```bash
    flight web-suite restart
    ```

## Connecting to Web Suite

Navigate to the external IP or hostname set for the gateway (that was provided to the `set-domain` command, for example, `https://51.104.217.61`)

Log in with the same user details used for accessing the cluster from a CLI.

If you find yourself being logged out when changing pages, you may need to [add an entry in your hosts file.](https://www.manageengine.com/network-monitoring/how-to/how-to-add-static-entry.html).
