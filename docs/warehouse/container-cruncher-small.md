---
hide:
  - navigation
  - toc 
title: "Container Cruncher (Small)"
search:
  exclude: true
---

{% with id="container-cruncher-small" %}
  {% include "warehouse/template-page.html" %}
{% endwith %}

## Use

=== "Launch Instructions"

    _This template requires that you have access to an OpenStack Private Cloud Environment which has the latest
    [Flight Solo](../docs/flight-solo/get-solo/index.md) image available._

    1. Download the template provided above
    1. Launch the cluster (replacing `mycluster1` with your desired cluster name)
        ```bash
        openstack stack create -t container-cruncher-small.yml \
            --parameter clustername=mycluster1 \
            --parameter external-network=dmz \
            --parameter ssh-key="ssh-rsa MyPublicKey" \
            --parameter solo-image="Flight Solo 2023.6" \
            --parameter gateway-flavour=m1.medium \
            --parameter node-flavour=m1.small \
            "mycluster1" --wait
        ```

    It will take about 10 minutes for the cluster to launch and fully configure itself to be ready for usage. Progress of the application can be verified as complete when `flight profile list` on `gateway1` shows all nodes with a status of `complete`.

    Once launched, you can access the cluster via ssh to the public IP of `gateway1` as the user `flight` with the private key that corresponds with the `ssh-key` parameter.

=== "Usage Instructions"

    ### Accessing System

    Once launched, you can access the cluster via ssh to the public IP of `gateway1` as the user `flight` with the private key that corresponds with the `ssh-key` parameter.

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

    !!! warning
        Note that, while the `/home` directory is shared across the cluster, it does not utilise the shared storage disk of `gateway1` and therefore should not be used for project data

    Additionally, data can be copied to the cluster using the [Flight File Manager](../docs/flight-environment/use-flight/flight-web-suite/file-manager.md) in Flight Web Suite.
