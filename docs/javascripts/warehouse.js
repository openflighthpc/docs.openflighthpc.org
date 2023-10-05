const data = [
    {
      "id": "slurm-team-edition",
      "title": "SLURM: Team Edition",
      "num_users": "1 - 10",
      "max_num_users": 10,
      "lifetime": "1 - 3 months",
      "storage": "1TB",
      "cost": "$10 / day",
      "capability": 1,
      "tagline": "A small collaborative environment, great for teams running short projects."
    },
    {
      "id": "big-data",
      "title": "Big data: Bootstrap",
      "num_users": "1",
      "max_num_users": 1,
      "lifetime": "6 - 12 months",
      "storage": "5TB",
      "cost": "$15 / day",
      "capability": 2,
      "tagline": "Enough power and storage for crunching your big datasets."
    },
    {
      "id": "container-cruncher-small",
      "title": "Container Cruncher (small)",
      "num_users": "1",
      "max_num_users": 1,
      "lifetime": "1 - 3 months",
      "storage": "100GB",
      "cost": "$10 / day",
      "capability": 1,
      "tagline": "A small single-user Kubernetes environment, suitable for evaluating workflows and running a few microservices."
    }
  ];

const filterData = [
  {
    "name": "Number of users",
    "filter": "max_num_users",
    "icon": "fa-users",
    "options": ['Single user', 'Multiple users'],
  },
  {
    "name": "Lifetime",
    "filter": "lifetime",
    "icon": "fa-clock",
    "options": ['< 6 months', '6 - 12 months', '1+ years'],
  },
  {
    "name": "Storage",
    "filter": "storage",
    "icon": "fa-database",
    "options": ['< 1TB', '1 - 5TB', '5+ TB'],
  },
  {
    "name": "Estimated cost",
    "filter": "cost",
    "icon": "fa-credit-card",
    "options": ['Free', '< $10 per day', '$10+ per day'],
  }
]

const capabilityAlt = ["Low", "Medium", "High"];

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#template-content')) {
    document.querySelector('.md-content__inner').classList.add('template-page-padding');

    let templateID = document.getElementById('template-content').dataset.template;
    inputData(data.find(template => template.id === templateID), document);
  }

  if (document.querySelector('#warehouse')) {
    addCards();
    addFilters();
    addFilterDropdowns();
  }
});

function addCards() {
  const blankCard = document.getElementById('blank-template-card');
  for (let i = 0; i < data.length; i++) {
    let templateCard = blankCard.cloneNode(true);
    let id = data[i].id;
    templateCard.id = id;
    templateCard.href = id;
    templateCard.style.display = 'grid';
    templateCard.querySelector('img').src = `../assets/images/template-icons/${id}.svg`;
    inputData(data[i], templateCard);
    document.getElementById('warehouse').append(templateCard);
  }
}

function inputData(templateData, container) {
  let titles = container.getElementsByClassName('template-title');
  for (let i = 0; i < titles.length; i++) {
    titles[i].innerHTML = templateData['title'];
  }
  const keys = Object.keys(templateData);
  for (let i = 0; i < keys.length; i++) {
    let el = container.querySelector(`.${keys[i]}`);
    if (el !== null) {
      if (keys[i] === 'capability') {
        setCapability(templateData, container);
      } else {
        el.innerHTML = templateData[keys[i]];
      }
    }
  }
}

function setCapability(templateData, container) {
  const musclyArms = container.getElementsByClassName('muscly-arm');
  const capability = templateData['capability'];
  for (let i = 0; i < capability; i++) {
    musclyArms[i].style.filter = "brightness(1) saturate(1)";
  }
  container.querySelector('.capability .muscly-arm-container').setAttribute('aria-label', capabilityAlt[capability - 1]);
}

function addFilters() {
  const blankFilter = document.getElementById('blank-filter-container');
  for (let i = 0; i < filterData.length; i++) {
    let filter = blankFilter.cloneNode(true);
    let data = filterData[i];
    filter.querySelector('.template-stats-icon').classList.add(data['icon']);
    filter.querySelector('.filter span').innerHTML = data['name'];
    let dropdown = filter.querySelector('.dropdown-options');
    let options = data['options'];
    for (let i = 0; i < options.length; i++) {
      let option = `
        <label class="dropdown-option" for="${data['filter']}-${i}">
          <input type="checkbox" id="${data['filter']}-${i}">
          ${options[i]}
        </label>
        <br>
      `;
      dropdown.innerHTML += option;
    }
    filter.style.display = 'inherit';
    document.getElementById('filter-bar').append(filter);
  }
}

function addFilterDropdowns() {
  let filters = document.getElementsByClassName('filter-container');
  for (let i = 0; i < filters.length; i++) {
    let filter = filters[i];
    let chevron = filter.querySelector('.fa-chevron-down');
    let dropdown = filter.querySelector('.dropdown-container');
    filter.addEventListener('click', () => {
      if (dropdown.offsetParent === null) {
        dropdown.style.display = "block";
        chevron.style.rotate = "180deg";
      } else {
        dropdown.style.display = "none";
        chevron.style.rotate = "0deg";
      }
    });
  }
}
