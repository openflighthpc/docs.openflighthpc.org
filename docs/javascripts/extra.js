document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.no-tabs')) {
    document.querySelector('#tabs').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
  }
});
