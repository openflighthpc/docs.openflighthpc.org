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
    <div id="narrow-screen-filter-button" class="filter" onclick="showFilters()">
      <span>Filters</span>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    <div id="filter-dropdowns-container">
      {% include "warehouse/filter-dropdown.html" %}
      <div id="narrow-screen-button-container">
        <div id="clear-filters-button" class="button" onclick="clearAndHideFilters()">
          CLEAR ALL
        </div>
        <div class="button" onclick="hideFilters()">
          APPLY
        </div>
      </div>
    </div>
  </div>
  <div id="filter-info">
    <div id="current-filters"></div>
    <a onclick="clearAllFilters()">
      Clear filters
    </a>
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
