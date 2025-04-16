// Header después de la intro
// const header = document.querySelector('header');
// const mainContent = document.querySelector('.k-content');

// window.addEventListener('scroll', () => {
//   if (window.scrollY > 750) {
//     header.classList.add('visible-header');
//     mainContent.style.marginTop = '70px';
//   } else {
//     header.classList.remove('visible-header');
//     mainContent.style.marginTop = '0px';
//   }
// });

// Initialize scroll animations for home

const menu = document.querySelector('.dropbtn');
menu.addEventListener('click', () => {
  console.log('hi');
  const maintenance = document.querySelector('.maintenance');
  (maintenance.classList.contains('visually-hidden')) ? maintenance.classList.remove('visually-hidden') : maintenance.classList.add('visually-hidden');
})


window.addEventListener('resize', spin);
spin();

// Para el boton de Agendar Llamada

const focusView = document.getElementById('focus-view');
const slider = document.querySelector('.products-3d .slider');

showFocus();

// Etiqueta de los productos (Sirve para new, pero la voy a usar para el pressButton)
const services = document.querySelectorAll('.products-3d .slider .item');

console.log(services);

const obsPressImg = new IntersectionObserver((entries, obsPressImg) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      services.forEach((image, index) => {
        console.log(`imagen ${index} cambio animacion`);
        image.classList.add('press');
      })
      obsPressImg.unobserve(entry.target);
    }
  })
}, {threshold: 0.5});

obsPressImg.observe(slider);
obsPressImg.observe(services[0]);

services.forEach(service => {
  const img = service.querySelector('img');
  img.addEventListener('mouseenter', () => {
    console.log('hover');
    service.classList.add('invisible');
  });

  img.addEventListener('mouseleave', () => {
    console.log("leave");
    service.classList.remove('invisible');
  });
})