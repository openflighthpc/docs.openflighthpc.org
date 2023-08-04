document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.no-tabs')) {
    document.querySelector('#tabs').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#home-container')) {
    document.querySelector('.md-content__inner').style.backgroundColor = '#ECECEC';
  }
});
