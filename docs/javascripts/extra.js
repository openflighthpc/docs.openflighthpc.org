document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.no-tabs')) {
    document.querySelector('#tabs').style.display = 'flex';
    document.querySelector('.search-container').style.display = 'inline';
  }
});
