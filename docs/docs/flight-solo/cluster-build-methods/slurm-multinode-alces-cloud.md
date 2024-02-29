# SLURM Multinode on Alces Cloud

## Launch Login Node

### Prepare User Data

{% include 'flight-solo/creating-clusters/prepare-user-data-login.md' %}

### Deploy

=== "CLI"

    {%filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-login-node-alces-cloud-cli.md' %}
    {% endfilter %}

=== "GUI"

    {%filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-login-node-alces-cloud-gui.md' %}
    {% endfilter %}

## Launch Compute Nodes

### Prepare User Data

{% include 'flight-solo/creating-clusters/prepare-user-data-compute.md' %}

### Deploy

=== "CLI"

    {%filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-compute-nodes-alces-cloud-cli.md' %}
    {% endfilter %}

=== "GUI"

    {%filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-compute-nodes-alces-cloud-gui.md' %}
    {% endfilter %}

## General Configuration

{% include 'flight-solo/creating-clusters/general-config.md' %}

## SLURM Multinode Configuration

{% include 'flight-solo/creating-clusters/slurm-multinode-config.md' %}

## Verifying Functionality

{% include 'flight-solo/creating-clusters/slurm-testing.md' %}
