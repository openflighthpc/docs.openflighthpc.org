const templateData = [
  {
    "id": "slurm-team-edition",
    "title": "SLURM: Team Edition",
    "tagline": "A small collaborative environment, great for teams running short projects.",
    "num_users": 10, // maximum number of users
    "lifetime": 3,   // maximum recommended lifetime (months)
    "storage": 1000, // storage (GB)
    "cost": 10,      // estimated running costs ($ per day)
    "capability": 1, // number of muscly arms (1-3)
    "sort_priority": 1, // defines 'recommended' sort order, e.g. 1 has first priority and appears first
  },
  {
    "id": "big-data",
    "title": "Big data: Bootstrap",
    "tagline": "Enough power and storage for crunching your big datasets.",
    "num_users": 1,
    "lifetime": 12,
    "storage": 5000,
    "cost": 15,
    "capability": 2,
    "sort_priority": 3,
  },
  {
    "id": "container-cruncher-small",
    "title": "Container Cruncher (small)",
    "tagline": "A small single-user Kubernetes environment, suitable for evaluating workflows and running a few microservices.",
    "num_users": 1,
    "lifetime": 3,
    "storage": 100,
    "cost": 10,
    "capability": 1,
    "sort_priority": 2,
  },
];

const filterData = [
  {
    "name": "Number of users",
    "filter": "num_users",
    "icon": "fa-users",
    "options": ['Single user', 'Multiple users'],
    "thresholds": [1],
    "hover": "Maximum number of users",
  },
  {
    "name": "Max lifetime",
    "filter": "lifetime",
    "icon": "fa-clock",
    "options": ['Up to 6 months', '6 - 12 months', 'Over 1 year'],
    "thresholds": [6, 12],
    "hover": "Maximum recommended lifetime",
  },
  {
    "name": "Storage",
    "filter": "storage",
    "icon": "fa-database",
    "options": ['Up to 1TB', '1 - 5TB', 'Over 5TB'],
    "thresholds": [1000, 5000],
  },
  {
    "name": "Estimated cost",
    "filter": "cost",
    "icon": "fa-credit-card",
    "options": ['Free', 'Up to $10 per day', 'Over $10 per day'],
    "thresholds": [0, 10],
    "hover": "Estimated running costs based on our internal cloud platform - yours may vary based on hardware configuration and energy prices for your private cloud server.",
  },
  {
    "name": "Capability",
    "filter": "capability",
    "icon": "fa-dumbbell",
    "options": [1, 2, 3],
    "thresholds": [1, 2],
    "hover": "Indicates the strength of the cluster in terms of scale of the service. This is a combination of recommended users, lifetime, storage and compute capacity.",
  },
];

const capabilityAlt = ["Low", "Medium", "High"];

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#template-content')) {
    document.querySelector('.md-content__inner').classList.add('template-page-padding');

    let templateID = document.getElementById('template-content').dataset.template;
    inputData(templateData.find(template => template.id === templateID), document);
  }

  if (document.querySelector('#warehouse')) {
    addCards();
    addFilters();
    addFilterDropdowns();
  }
});

document.addEventListener('click', (e) => {
  let filters = document.getElementsByClassName('filter-container');
  for (let i = 0; i < filters.length; i++) {
    let filter = filters[i];
    let chevron = filter.querySelector('.fa-chevron-down');
    let dropdown = filter.querySelector('.dropdown-container');
    if (!filter.contains(e.target)) {
      hideDropdown(dropdown, chevron);
    }
  }
});

window.addEventListener('resize', () => {
  const em = Number(
    getComputedStyle(document.querySelector('.filter span'))
      .fontSize
      .replace('px', '')
  );
  if (window.innerWidth <= 74.5 * em) {
    hideFilters();
  } else {
    showFilters();
  }
});

function addCards() {
  const blankCard = document.getElementById('blank-template-card');
  for (let i = 0; i < templateData.length; i++) {
    let templateCard = blankCard.cloneNode(true);
    let id = templateData[i].id;
    templateCard.id = id;
    templateCard.href = id;
    templateCard.style.display = 'grid';
    templateCard.querySelector('img').src = `../assets/images/template-icons/${id}.svg`;
    inputData(templateData[i], templateCard);
    document.getElementById('warehouse').append(templateCard);
  }
  sortCards(document.getElementById('default-sort-option'));
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
      if (keys[i] === 'num_users') {
        setNumUsers(templateData['num_users'], el);
      } else if (keys[i] === 'lifetime') {
        setLifetime(templateData['lifetime'], el);
      } else if (keys[i] === 'storage') {
        setStorage(templateData['storage'], el);
      } else if (keys[i] === 'cost') {
        el.innerHTML = `$${templateData['cost']} / day`;
      } else if (keys[i] === 'capability') {
        setCapability(templateData['capability'], container);
      } else {
        el.innerHTML = templateData[keys[i]];
      }
    }
  }

  function setNumUsers(numUsers, el) {
    if (numUsers.length > 1) {
      el.innerHTML = numUsers.join(' - ');
    } else {
      el.innerHTML = numUsers;
    }
  }

  function setLifetime(lifetime, el) {
    if (lifetime >= 12) {
      const years = Math.floor(lifetime / 12);
      el.innerHTML = `${years} ${pluralize(years, 'year')}`;
    } else {
      el.innerHTML = `${lifetime} ${pluralize(lifetime, 'month')}`;
    }
  }

  function pluralize(num, noun) {
    return `${noun}${num > 1 ? "s" : ""}`;
  }

  function setStorage(gb, el) {
    if (gb >= 1000) {
      const tb = Math.round(gb * 10 / 1000) / 10;
      el.innerHTML = `${tb}TB`;
    } else {
      el.innerHTML = `${gb}GB`;
    }
  }

  function setCapability(capability, container) {
    const musclyArms = container.getElementsByClassName('muscly-arm');
    for (let i = 0; i < capability; i++) {
      musclyArms[i].style.filter = "brightness(1)";
    }
    container.querySelector('.capability .muscly-arm-container').setAttribute('aria-label', capabilityAlt[capability - 1]);
  }
}

function sortCards(selected, sortOption) {
  const cardContainer = document.getElementById('warehouse');
  const sortContainer = document.querySelector('#sort-container');
  const cards = [...cardContainer.children];
  cards.splice(
    cards.indexOf(
      cards.find(card => card.id === 'blank-template-card')
    ),
  1);
  cards
    .sort((a, b) => getProperty(a, 'sort_priority') > getProperty(b, 'sort_priority') ? 1 : -1)
    .forEach(node => cardContainer.appendChild(node));
  if (sortOption !== undefined) {
    let sortFunction;
    if (sortOption === 'nameAsc') {
      sortFunction = function(a, b) {
        return getProperty(a, 'title') > getProperty(b, 'title') ? 1 : -1;
      };
    } else if (sortOption === 'nameDesc') {
      sortFunction = function(a, b) {
        return getProperty(a, 'title') < getProperty(b, 'title') ? 1 : -1;
      };
    } else if (sortOption === 'costAsc') {
      sortFunction = function(a, b) {
        return getProperty(a, 'cost') > getProperty(b, 'cost') ? 1 : -1;
      };
    } else if (sortOption === 'costDesc') {
      sortFunction = function(a, b) {
        return getProperty(a, 'cost') < getProperty(b, 'cost') ? 1 : -1;
      };
    }
    cards
      .sort((a, b) => sortFunction(a, b))
      .forEach(node => cardContainer.appendChild(node));
  }
  sortContainer.querySelector('.filter span').innerHTML = selected.innerHTML;
  const previouslySelected = sortContainer.querySelector('.dropdown-option.selected');
  if (previouslySelected !== selected) {
    previouslySelected.classList.remove('selected');
    selected.classList.add('selected');
  }
  hideDropdown(
    sortContainer.querySelector('.dropdown-container'),
    sortContainer.querySelector('.fa-chevron-down')
  );

  function getProperty(card, property) {
    return templateData.find(template => template['id'] === card.id)[property];
  }
}

function addFilters() {
  const blankFilter = document.getElementById('blank-filter-container');
  for (let i = 0; i < filterData.length; i++) {
    let filter = blankFilter.cloneNode(true);
    let data = filterData[i];
    filter.querySelector('.template-stats-icon').classList.add(data['icon']);
    filter.querySelector('.filter span').innerHTML = data['name'];
    filter.title = (data['hover'] !== undefined) ? data['hover'] : data['name'];
    let dropdown = filter.querySelector('.dropdown-options');
    let filterType = data['filter'];
    let options = filterOptions(filterType, data['options']);
    for (let i = 0; i < options.length; i++) {
      let option = `
        <label class="dropdown-option" for="${filterType}-${i}">
          <input
            type="checkbox"
            id="${filterType}-${i}"
            class="checkbox"
            data-number="${i}"
            data-type="${filterType}"
            onclick="applyFilters()"
          >
          ${options[i]}
        </label>
        <br>
      `;
      dropdown.innerHTML += option;
    }
    filter.style.display = 'block';
    filter.id = `${data['filter']}-filter-container`;
    filter.classList.add('filter-container');
    document.getElementById('filter-dropdowns-container').append(filter);
  }
}

function filterOptions(filterType, filterOptions) {
  if (filterType === 'capability') {
    let numOptions = filterOptions.length;
    let options = new Array(numOptions);
    const musclyArm = document.querySelector('.muscly-arm').cloneNode(true);
    musclyArm.style.filter = "brightness(1)";
    const musclyArmHTML = musclyArm.outerHTML;
    for (let i = 1; i <= numOptions; i++) {
      options[i - 1] = "";
      for (let j = 1; j <= i; j++) {
        options[i - 1] += musclyArmHTML;
      }
    }
    return options;
  }
  return filterOptions;
}

function addFilterDropdowns() {
  let filters = document.getElementsByClassName('filter-container');
  for (let i = 0; i < filters.length; i++) {
    let filter = filters[i];
    let chevron = filter.querySelector('.fa-chevron-down');
    let dropdown = filter.querySelector('.dropdown-container');
    filter.querySelector('.filter').addEventListener('click', () => {
      if (dropdown.offsetParent === null) {
        hideAllDropdowns();
        dropdown.style.display = "block";
        chevron.style.rotate = "180deg";
      } else {
        hideDropdown(dropdown, chevron);
      }
    });
  }

  function hideAllDropdowns() {
    for (let i = 0; i < filters.length; i++) {
      let filter = filters[i];
      let dropdown = filter.querySelector('.dropdown-container');
      if (dropdown.offsetParent !== null) {
        hideDropdown(dropdown, filter.querySelector('.fa-chevron-down'));
      }
    }
  }
}

function hideDropdown(dropdown, chevron) {
  dropdown.style.display = "none";
  chevron.style.rotate = "0deg";
}

function clearSingleFilter(button) {
  document.getElementById(button.parentNode.dataset.filterId).checked = false;
  applyFilters();
}

function clearFiltersFromGroup(button) {
  clearFilters(button.parentNode);
}

function clearAllFilters() {
  clearFilters(document);
}

function clearFilters(container) {
  let filterCheckboxes = container.querySelectorAll('.dropdown-options input');
  for (let i = 0; i < filterCheckboxes.length; i++) {
    filterCheckboxes[i].checked = false;
  }
  applyFilters();
}

function applyFilters() {
  let passed = [];
  for (let i = 0; i < filterData.length; i++) {
    const filterGroup = document.getElementById(`${filterData[i]['filter']}-filter-container`);
    const passedGroup = templatesThatPassFilterGroup(filterGroup);
    if (i === 0) {
      passed = passedGroup;
    } else {
      passed = passed.filter(template => passedGroup.includes(template));
    }
  }
  for (let i = 0; i < templateData.length; i++) {
    let id = templateData[i].id;
    let template = document.getElementById(id);
    if (template.offsetParent === null && passed.includes(id)) {
      template.style.display = "grid";
    } else if (template.offsetParent !== null && !passed.includes(id)) {
      template.style.display = "none";
    }
  }
  renderNoTemplatesMessage(passed.length);
  renderFilterInfo();

  function renderFilterInfo() {
    const checkboxes = Array.from(document.querySelectorAll(`#filter-bar .checkbox`));
    const selected = checkboxes.filter(checkbox => checkbox.checked);
    const numFilters = selected.length;
    const filterInfo = document.getElementById('filter-info');
    const currentFilters = document.getElementById('current-filters');
    const blankFilterInfo = document.getElementById('blank-current-filter');
    const clearButton = document.getElementById('filter-info-clear-button');
    currentFilters.innerHTML = clearButton.outerHTML;
    if (numFilters > 0) {
      for (let i = 0; i < numFilters; i++) {
        let filter = blankFilterInfo.cloneNode(true);
        let cb = selected[i];
        const filterNum = Number(cb.dataset.number);
        const filterType = cb.dataset.type;
        let options = filterData.find(x => x['filter'] === filterType)['options'];
        filter.querySelector('.filter-name').innerHTML = filterOptions(filterType, options)[filterNum];
        filter.id = "";
        filter.dataset.filterId = cb.id;
        filter.style.display = "flex";
        currentFilters.append(filter);
      }
      filterInfo.style.display = "flex";
    } else {
      filterInfo.style.display = "none";
    }
  }

  function templatesThatPassFilterGroup(filterGroup) {
    const checkboxes = Array.from(filterGroup.querySelectorAll(`.checkbox`));
    const selected = checkboxes.filter(checkbox => checkbox.checked);
    let passed = [];
    if (selected.length === checkboxes.length || selected.length === 0) {
      passed = templateData.map(template => template.id);
    } else {
      for (let i = 0; i < selected.length; i++) {
        passed = passed.concat(templatesThatPassFilter(selected[i]));
      }
    }
    return passed;
  }

  function templatesThatPassFilter(cb) {
    const filterNum = Number(cb.dataset.number);
    const filterType = cb.dataset.type;
    const filterThresholds = filterData.find(data => data['filter'] === filterType)['thresholds'];
    let filterThreshold;
    if (filterNum === 0) {
      filterThreshold = filterThresholds[filterNum];
      return templateData.filter(template => template[filterType] <= filterThreshold).map(template => template.id);
    } else if (filterNum === filterThresholds.length) {
      filterThreshold = filterThresholds[filterThresholds.length - 1];
      return templateData.filter(template => template[filterType] > filterThreshold).map(template => template.id);
    } else {
      filterThreshold = filterThresholds.slice(filterNum - 1, filterNum + 1);
      if (filterType === 'capability') {
        return templateData.filter(template => template['capability'] === 2).map(template => template.id);
      }
      return templateData.filter(template => template[filterType] >= filterThreshold[0] && template[filterType] <= filterThreshold[1]).map(template => template.id);
    }
  }

  function renderNoTemplatesMessage(numPassed) {
    const noTemplatesMessage = document.getElementById('no-templates-message');
    if (numPassed === 0) {
      noTemplatesMessage.style.display = "block";
    } else {
      noTemplatesMessage.style.display = "none";
    }
  }
}

function showFilters() {
  document.getElementById('filter-dropdowns-container').style.display = "flex";
  document.body.style.overflow = 'hidden';
  window.addEventListener("scroll", noscroll);
}

function hideFilters() {
  document.getElementById('filter-dropdowns-container').style.display = "none";
  document.body.style.overflow = '';
  window.removeEventListener("scroll", noscroll);
}

function clearAndHideFilters() {
  clearAllFilters();
  hideFilters();
}
