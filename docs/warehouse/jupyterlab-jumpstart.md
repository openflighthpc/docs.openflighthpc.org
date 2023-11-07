---
hide:
  - navigation
  - toc 
title: "JupyterLab Jumpstart"
search:
  exclude: true
---

{% with id="jupyterlab-jumpstart" %}
  {% include "warehouse/template-page.html" %}
{% endwith %}

## Use

=== "Launch Instructions"

    _This template requires that you have access to an OpenStack Private Cloud Environment which has the latest
    [Flight Solo](../docs/flight-solo/get-solo/index.md) image available._

    1. Download the template provided above
    1. Launch the cluster (replacing `mycluster1` with your desired cluster name)
        ```bash
        openstack stack create -t jupyterlab-jumpstart.yml \
            --parameter clustername=mycluster1 \
            --parameter external-network=dmz \
            --parameter ssh-key="ssh-rsa MyPublicKey" \
            --parameter solo-image="Flight Solo 2023.6" \
            --parameter gateway-flavour=m1.medium \
            "mycluster1" --wait
        ```

    It will take about 10 minutes for the cluster to launch and fully configure itself to be ready for usage. Progress of the application can be verified as complete when `flight profile list` on `gateway1` shows a status of `complete`.

    Once launched, you can access the cluster via ssh to the public IP of `gateway1` as the user `flight` with the private key that corresponds with the `ssh-key` parameter.

=== "Usage Instructions"

    ### Accessing System

    Once launched, you can access the cluster via ssh to the public IP of `gateway1` as the user `flight` with the private key that corresponds with the `ssh-key` parameter.

    The [Flight Web Suite](../docs/flight-environment/use-flight/flight-web-suite/index.md) is automatically configured on the system and is accessible at the public IP of `gateway1`. JupyterLab can also be accessed via the Flight Web Suite.

    The password for both Flight Web Suite and JupyterLab is auto-generated at launch and is available at `/root/flight_user_pass.txt` on `gateway1`.

    ### Copying Data Across

    The IP address of the `gateway1` node should be shared with you by the system administrator for this cluster.
    Once received, see the [HPC Environment Basics guide to Working with Data and Files](../docs/hpc-environment-basics/linux-usage/working-with-data/index.md).

    Additionally, data can be copied to the cluster using the [Flight File Manager](../docs/flight-environment/use-flight/flight-web-suite/file-manager.md) in Flight Web Suite.

## Watch

<iframe width="100%" src="https://www.youtube.com/embed/ltvcBHIBArI?si=6I5pMkNvKid4xAoi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="aspect-ratio: 16/9;"></iframe>
