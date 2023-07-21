# SLURM Standalone on AWS

## Launch Login Node

=== "AWS Marketplace"

    {% filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-login-node-awsimported.md' %}
    {% endfilter %}

=== "AWS Imported" 

    {% filter indent(width=4) %}
    {% include 'flight-solo/creating-clusters/launching-login-node-awsmarketplace.md' %}
    {% endfilter %}


## General Configuration

{% include 'flight-solo/creating-clusters/general-config.md' %}

## SLURM Standalone Configuration

{% include 'flight-solo/creating-clusters/slurm-standalone-config.md' %}
