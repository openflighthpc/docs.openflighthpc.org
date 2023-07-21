# Kubernetes Multinode on AWS

## Launch Login Node

### Prepare User Data

{% include 'flight-solo/creating-clusters/prepare-user-data-login.md' %}

### Deploy

=== "AWS Marketplace"

    {% filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-login-node-awsmarketplace.md' %}
    {% endfilter %}

=== "AWS Imported"

    {% filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-login-node-awsimported.md' %}
    {% endfilter %}

## Launch Compute Nodes

### Prepare User Data

{% include 'flight-solo/creating-clusters/prepare-user-data-compute.md' %}

### Deploy

=== "AWS Marketplace"

    {% filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-compute-nodes-awsmarketplace.md' %}
    {% endfilter %}

=== "AWS Imported"

    {% filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-compute-nodes-awsimported.md' %}
    {% endfilter %}

## General Configuration

{% include 'flight-solo/creating-clusters/general-config.md' %}

## Kubernetes Multinode Configuration

{% include 'flight-solo/creating-clusters/kubernetes-multinode-config.md' %}
