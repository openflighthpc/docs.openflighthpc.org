---
hide:
  - navigation
  - toc
title: "SLURM: Team Edition"
search:
  exclude: true
---

<script src="https://kit.fontawesome.com/5d76af6daa.js" crossorigin="anonymous"></script>

<div class="no-tabs full-width-container">
  <div class="warehouse-header">
    <a class="template-back-link" href="javascript:history.back()">< Back</a>
    <img
      alt=""
      class="template-icon"
      src="{{ config.site_url }}/assets/images/template-icons/slurm_team.svg"
    >
    <div class="template-title">
      <h1>{{ title }}</h1>
      <p>
        A small collaborative environment, great for teams running short projects. 
      </p>
    </div>
  </div>

  <div class="template-content">
    <div class="stats-card card">
      <ul class="template-stats card-text">
        <li>
          <i class="template-stats-icon fa-solid fa-users"></i>
          <strong>Number of users:</strong>
          <span> {{ num_users }} </span>
        </li>
        <li>
          <i class="template-stats-icon fa-solid fa-clock" title="Lifetime"></i>
          <strong>Lifetime:</strong>
          <span> {{ lifetime }} </span>
        </li>
        <li>
          <i class="template-stats-icon fa-solid fa-database" title="Storage"></i>
          <strong>Storage:</strong>
          <span> {{ storage }} </span>
        </li>
        <li>
          <i class="template-stats-icon fa-solid fa-credit-card" title="Estimated running costs"></i>
          <strong>Estimated running costs:</strong>
          <span> {{ cost }} </span>
        </li>
        <li>
          <i class="template-stats-icon fa-solid fa-dumbbell" title="Capability"></i>
          <strong>Capability:</strong>
          <span> {{ capability }} </span>
        </li>
      </ul>
    </div>
    <h2>Download</h2>
    <p class="tagline">
      Start building your cluster by downloading the Slurm: team edition template.
    </p>
    <div class="highlight">
      <a 
        title="Download slurm-team-edition.yml"
        href="{{ config.site_url }}/assets/templates/slurm-team-edition.yml" 
        class="filename card link"
        download
      >
        <span class="tagline card-text">slurm-team-edition.yml</span>
        <img 
          alt=""
          src="{{ config.site_url }}/solo/assets/images/download.svg"
        >
      </a>
    </div>

```
{% include "warehouse/templates/slurm-team-edition.yml" %}
```
  </div>
</div>
