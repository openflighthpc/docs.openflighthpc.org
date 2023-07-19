document.addEventListener('DOMContentLoaded', () => {
  let rightButton = document.getElementById('right');
  if (rightButton !== null) {
    let image = document.getElementById('slider-image');
    let link = document.getElementById('slider-link');
    rightButton.addEventListener('click', function(evt) {
     if (image.classList.contains('1')) {
       image.src = "assets/images/slider_2.png";
       image.classList.add('2');
       image.classList.remove('1');
       link.classList.add('image2');
       link.classList.remove('image1');
       link.href = "../flight-environment";
     } else { 
       image.src = "assets/images/slider_1.png";
       image.classList.add('1');
       image.classList.remove('2');
       link.classList.add('image1');
       link.classList.remove('image2');
       link.href = "../flight-solo";
     }
   });
  };
});

if (document.querySelector('.no-tabs')) {
  document.querySelector('#tabs').style.display = 'none';
}

