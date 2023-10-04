---
hide:
  - navigation
  - toc
title: "Flight Warehouse"
search:
  exclude: true
---

<script src="https://kit.fontawesome.com/5d76af6daa.js" crossorigin="anonymous"></script>
<script src="../javascripts/warehouse.js"></script>

<div class="no-tabs full-width-container">
  <div class="warehouse-header warehouse-main-header">
    <img
      alt="Flight Warehouse"
      class="template-icon"
      src="../assets/images/warehouse.svg"
    >
    <p class="warehouse-tagline tagline">
      Choose from our selection of free templates to start building a cluster using your private cloud resources.
    </p>
  </div>
</div>
<div id="warehouse" class="full-width-container">
  {% with id="slurm-team-edition" %}
    {% include "warehouse/template-card.html" %}
  {% endwith %}
  {% with id="big-data" %}
    {% include "warehouse/template-card.html" %}
  {% endwith %}
  {% with id="container-cruncher-small" %}
    {% include "warehouse/template-card.html" %}
  {% endwith %}
</div>
<h1></h1>
