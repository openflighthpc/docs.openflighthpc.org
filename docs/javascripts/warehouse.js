const data =
  { "slurm-team-edition": {
      "id": "slurm-team-edition",
      "title": "SLURM: Team Edition",
      "num_users": "1 - 10",
      "lifetime": "1 - 3 months",
      "storage": "1TB",
      "cost": "$10 / day",
      "capability": "Low",
      "tagline": "A small collaborative environment, great for teams running short projects."
    },
    "big-data": {
      "id": "big-data",
      "title": "Big data: Bootstrap",
      "num_users": "1",
      "lifetime": "6 - 12 months",
      "storage": "5TB",
      "cost": "$15 / day",
      "capability": "Medium",
      "tagline": "Enough power and storage for crunching your big datasets."
    }
  };

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#template-content')) {
    document.querySelector('.md-content__inner').style.paddingInline = '15rem';

    let templateID = document.getElementById('template-content').dataset.template;
    inputInfo(templateID);
  }
});

function inputInfo(templateID) {
  const templateInfo = data[templateID];
  let titles = document.getElementsByClassName('template-title');
  for (let i = 0; i < titles.length; i++) {
    titles[i].innerHTML = templateInfo['title'];
  }
  const keys = Object.keys(templateInfo);
  for (let i = 0; i < keys.length; i++) {
    let el = document.getElementById(keys[i]);
    if (el !== null) {
      el.innerHTML = templateInfo[keys[i]];
    }
  }
}
