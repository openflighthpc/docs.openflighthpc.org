---
hide:
  - navigation
  - toc
title: "Flight Warehouse"
search:
  exclude: true
---

<script src="https://kit.fontawesome.com/5d76af6daa.js" crossorigin="anonymous"></script>

<div class="no-tabs full-width-container">
  <div class="warehouse-header warehouse-main-header">
    <img
      alt="Flight Warehouse"
      class="template-icon"
      src="{{ config.site_url }}/assets/images/warehouse.svg"
    >
    <p class="warehouse-tagline tagline">
      Choose from our selection of free templates to start building a cluster using your private cloud resources.
    </p>
  </div>
</div>
<div id="warehouse" class="full-width-container">
  {% with title="SLURM: Team Edition", 
          num_users="1 - 10", 
          lifetime="1 - 3 months",
          storage="1TB", 
          cost="$10 / day",
          capability="Low",
          icon="slurm_team.svg",
          tagline="A small collaborative environment, great for teams running short projects.",
          link="slurm-team-edition"
  %}
    {% include "templates/template-card.html" %}
  {% endwith %}
  {% with title="Big data: Bootstrap", 
          num_users="1", 
          lifetime="6 - 12 months",
          storage="5TB", 
          cost="$15 / day",
          capability="Medium",
          icon="big_data.svg",
          tagline="Enough power and storage for crunching your big datasets.",
          link="big_data"
  %}
    {% include "templates/template-card.html" %}
  {% endwith %}
</div>
<h1></h1>