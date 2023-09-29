---
hide:
  - navigation
  - toc
title: "SLURM: Team Edition"
search:
  exclude: true
---

{% with num_users="1 - 10", 
        lifetime="1 - 3 months",
        storage="1TB",
        cost="$10 / day",
        capability="Low",
        icon="slurm_team.svg",
        tagline="A small collaborative environment, great for teams running short projects.",
        id="slurm-team-edition"
%}
  {% include "warehouse/template-page.html" %}
{% endwith %}

Launching your cluster will require the following steps:

1. [Launch login node](#launch-login-node)
2. [Launch compute nodes](#launch-compute-nodes)
3. [General configuration](#general-configuration)
4. [SLURM multinode configuration](#slurm-multinode-configuration)
5. [Verifying functionality](#verifying-functionality)

{% include "warehouse/docs/slurm-team-edition.md" %}
