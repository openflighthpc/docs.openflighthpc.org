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
  <div id="filter-bar">
    {% include "warehouse/filter-dropdown.html" %}
  </div>
  <div id="filter-info">
    <a onclick="clearAllFilters()">
      Clear filters
    </a>
    <div id="current-filters"></div>
  </div>
  {% include "warehouse/current-filter.html" %}
  <p id="no-templates-message">
    No templates found, please try different filter parameters.
  </p>
</div>
<div id="warehouse">
  {% include "warehouse/template-card.html" %}
</div>
<h1></h1>
