document.addEventListener('DOMContentLoaded', () => {
  let rightButton = document.getElementById('right');
  if (rightButton !== null) {
    let image = document.getElementById('slider-image');
    rightButton.addEventListener('click', function(evt) {
     if (image.classList.contains('1')) {
       image.src = "assets/images/slider_2.png";
       image.classList.add('2');
       image.classList.remove('1');
     } else { 
       image.src = "assets/images/slider_1.png";
       image.classList.add('1');
       image.classList.remove('2');
     }
   });
  };
});

