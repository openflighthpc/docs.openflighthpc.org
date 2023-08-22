document.addEventListener('DOMContentLoaded', () => {
  renderTabs();
  if (!document.querySelector('.no-footer')) {
    document.querySelector('#footer').style.display = 'block';
  }
});

window.addEventListener('resize', () => {
  renderTabs();
});

function renderTabs() {
  if (
    !document.querySelector('.no-tabs')
    && !document.querySelector('.top-right-links .search-container').offsetParent
  ) {
    document.querySelector('#tabs').style.display = 'flex';
  } else {
    document.querySelector('#tabs').style.display = 'none';
  }
}
