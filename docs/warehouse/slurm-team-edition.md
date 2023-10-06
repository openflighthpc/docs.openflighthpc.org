---
hide:
  - navigation
  - toc
title: "SLURM: Team Edition"
search:
  exclude: true
---

{% with id="slurm-team-edition" %}
  {% include "warehouse/template-page.html" %}
{% endwith %}

## Launch Instructions

_This template requires that you have access to an OpenStack Private Cloud Environment which has the latest
[Flight Solo](../docs/flight-solo/get-solo/index.md) image available._

1. Download the template provided above
2. Inspect the parameters within the template to ensure they match desired inputs 
3. At this point, the defaults for the parameters can be changed to match your desired input or the new values can be provided as arguments to the launch command
4. Launch the cluster (replacing `mycluster1` with your desired cluster name)
   ```bash
   openstack stack create -t output/slurm-team-edition.yml \
     --parameter clustername=stu2 \
       --parameter external-network=dmz \
       --parameter ssh-key="ssh-rsa MyPublicKey" \
       --parameter solo-image="Flight Solo 2023.6" \
       --parameter gateway-flavour=m1.medium \
       --parameter infra-flavour=m1.small \
       --parameter node-flavour=m1.small \
       --parameter secure-ipa-pass=MyIPAPassword \
       "stu2" --wait
   ```

It will take about 20 minutes for the cluster to launch and fully configure itself to be ready for usage. Progress of the application can be verified as complete when `flight profile list` on `gateway1` shows all nodes with a status of `complete`.

Once launched, you can access the cluster via ssh to the public IP of `gateway1` as the user `flight` with the private key that corresponds with the `ssh-key` parameter.

## Admin Instructions

### Storage Management

The cluster configures NFS for shared storage across the login and compute nodes. The directories shared are as follows:
- `/home`: For user home directories. Note that this directory does not utilise the shared storage disk of `gateway1` and therefore should not be used for project data
- `/opt/apps`: For installing shared applications
- `/opt/data`: For user project data
- `/opt/service`: For admin data and shared system configuration scripts
- `/opt/site`: For any other shared data or information on the cluster or site

### Adding Users

A test user is automatically created to verify the installation of IPA is successful. This user can be logged into from the `infra01` machine as the root user with the key generated for the testuser (`ssh -i /root/.ssh/id_testuser testuser@gateway1`).

To add a new user:

1. Login to `infra01` as the root user
1. Authorise as the IPA admin user (using the secure password specified at deployment)
   ```bash
   kinit admin
   ```
1. Add the user along with a trusted SSH public key (this should be one that corresponds with a private key that the user has outside of the system)
   ```bash
   ipa user-add --cn="New User" --first=New --last=User --sshpubkey="ssh-rsa TheirPublicKey" newuser
   ```
1. Set a temporary password for the user (this will later be changed by the user once they've accessed the system, **this temporary password will need to be shared with the new user**)
   ```bash
   ipa passwd newuser
   ```
3. Add the user to the cluster users group to enable access
   ```bash
   ipa group-add-member cluster-users --users newuser
   ```

Once the user has successfully logged in, they will need to set a password for themselves to be able to access the 
[Flight Web Suite](../docs/flight-environment/use-flight/flight-web-suite/index.md). This can be done by them running `kinit newuser`, 
entering their temporary password and then following the prompts to set a new one.

For more information on managing users, see the 
[FreeIPA Admin guide](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_identity_management/managing-user-accounts-using-the-command-line_configuring-and-managing-idm).

## Usage Instructions

### Accessing System

The IP address of the `gateway1` node should be shared with you by the system administrator for this cluster. 
Once received, see the [HPC Environment Basics guide to Logging In](../docs/hpc-environment-basics/linux-usage/cli-basics/logging-in.md).

You administrator should have shared a temporary password with you, this is used to authenticate you to set your own 
password which will allow you access to the [Flight Web Suite](../docs/flight-environment/use-flight/flight-web-suite/index.md).

### Copying Data Across

The IP address of the `gateway1` node should be shared with you by the system administrator for this cluster. 
Once received, see the [HPC Environment Basics guide to Working with Data and Files](../docs/hpc-environment-basics/linux-usage/working-with-data/index.md).

The cluster has shared storage configured for the following directories:

- `/home`: For user home directories. Note that this directory does not utilise the shared storage disk of `gateway1` 
and therefore should not be used for project data
- `/opt/apps`: For installing shared applications
- `/opt/data`: For user project data
- `/opt/service`: For admin data and shared system configuration scripts
- `/opt/site`: For any other shared data or information on the cluster or site

Additionally, data can be copied to the cluster using the [Flight File Manager](../docs/flight-environment/use-flight/flight-web-suite/file-manager.md)
in Flight Web Suite.
