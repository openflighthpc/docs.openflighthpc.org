document.addEventListener('DOMContentLoaded', () => {
  renderTabs();
  if (!document.querySelector('.no-footer')) {
    document.querySelector('#footer-container').style.display = 'block';
  }
  if (document.querySelector('.no-tabs')) {
    document.querySelector('.md-nav__list.sub-level').style.display = 'none';
    document.querySelector('.md-top.md-icon').style.display = 'none';
    document.getElementById('version-container').style.display = 'none';
  } else {
    document.querySelector('.md-banner--warning').style.display = 'block';
  }
  if (document.querySelector('.solo-container')) {
    populateNav();
    renderNav();
  }
});

window.addEventListener('resize', () => {
  renderTabs();
  renderNav();
});

function renderTabs() {
  if (!document.querySelector('.no-tabs') && !narrowScreen()) {
    document.querySelector('#tabs').style.display = 'flex';
  } else {
    document.querySelector('#tabs').style.display = 'none';
  }
}

function renderNav() {
  const soloDrawer = document.querySelector('#solo-drawer');
  if (soloDrawer) {
    if (narrowScreen()) {
      soloDrawer.style.display = 'block';
    } else {
      soloDrawer.style.display = 'none';
    }
  }
}

function populateNav() {
  let sidebar = document.querySelector('.solo-container .md-sidebar--primary');
  sidebar.innerHTML = `
    <div id="solo-drawer" class="md-sidebar__scrollwrap" hidden="hidden">
      <nav class="md-nav md-nav--primary md-nav--lifted">
        <label class="md-nav__title" for="__drawer">
          <a
            href=".."
            title="{{ config.site_name | e }}"
            class="md-nav__button md-logo md-nav-logo"
            aria-label="{{ config.site_name }}"
            data-md-component="logo"
            style="display: block;"
          >
            <img alt="OpenFlight HPC"
                 src="../assets/images/openflighthpc_grey.svg">
          </a>
        </label>
        <!-- Render item list -->
        <ul class="md-nav__list top-level" hidden="hidden">
          <li>
            <a href="../solo">
              FLIGHT SOLO
            </a>
          </li>
          <li>
            <a href="../warehouse">
              FLIGHT WAREHOUSE
            </a>
          </li>
          <li>
            <a href="../docs">
              DOCUMENTATION
            </a>
          </li>
        </ul>
        <a class="alces-link" href="https://alces-flight.com" target="_blank" hidden="hidden">
          <img alt="Powered by Alces Flight Ltd"
               class="header-image" src="../assets/images/poweredby.svg">
        </a>
      </nav>
    </div>
  `;
}

function stopFocusOnVersions() {
  const versionItems = document.querySelectorAll('.md-version__link');
  for (let i = 0; i < versionItems.length; i++) {
    versionItems[i].addEventListener('focus', (e) => {
      versionItems[i].blur();
    });
  }
}

waitForElm('.md-version').then(() => {
  stopFocusOnVersions();
});

function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function narrowScreen() {
  return document.querySelector('.top-right-links .search-container').offsetParent;
}
