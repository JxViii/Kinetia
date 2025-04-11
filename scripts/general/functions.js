function setupScrollAnimations(className) {
  const elements = document.querySelectorAll(`.${className}`);
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    // Ensure element has one of the directional classes
    const directions = ['scroll-from-top', 'scroll-from-bottom', 'scroll-from-left', 'scroll-from-right', 'scroll-from-dleft'];
    const hasDirection = directions.some(dir => el.classList.contains(dir));

    el.classList.add('scroll-animate-base');
  });

  function animateElements() {
    elements.forEach(el => {
      const posFromTop = el.getBoundingClientRect().top;

      if (posFromTop < windowHeight * 0.8) {
        el.classList.add('scroll-in-view');
      } else {
        el.classList.remove('scroll-in-view');
      }
    });
  }

  window.addEventListener('scroll', animateElements);
  window.addEventListener('resize', animateElements);
  animateElements();
}

function scrollAnimate(className, animationClass) {
  const elements = document.querySelectorAll(`.${className}`);
  const windowHeight = window.innerHeight;

  function checkPosition() {
    elements.forEach(el => {
      const posFromTop = el.getBoundingClientRect().top;

      if (posFromTop < windowHeight * 0.75) {
        el.classList.add(animationClass);
      } else {
        el.classList.remove(animationClass);
      }
    });
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', checkPosition);
  checkPosition();
}

function appear(className, callback = null) {
  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach(el => el.classList.add('hidden')); // Hide initially

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        obs.unobserve(el); // Animate only once

        setTimeout(() => {
          el.classList.remove('hidden');
          el.classList.add('visible');

          if (typeof callback === 'function') callback(el);
        }, index * 1700); // Delay each one by 300ms
      }
    });
  }, { threshold: 0.3 });

  elements.forEach(el => observer.observe(el));
}

// function typed(name, onComplete = null) {
//       new Typed(`#${name}`, {
//       strings: [
//         'Servicios de Creación de Contenido con IA',
//       ],
//       typeSpeed: 40,
//       showCursor: true,
//       cursorChar: '_',
//       onComplete: onComplete || function () {}
//     });
// }

// function count(numbers){
//   const counters = document.querySelectorAll(`.${numbers}`);
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         let value = +entry.target.getAttribute('data-target');
//         let count = 0;
//         let step = value / 100;

//         let interval = setInterval(() => {
//           count += step;
//           if (count >= value) {
//             count = value;
//             clearInterval(interval);
//           }
//           entry.target.textContent = Math.round(count) + "%";
//         }, 5);
//       }
//     });
//   }, { threshold: 0.5 });

//   counters.forEach(counter => {
//     observer.observe(counter);
//   });
// }

// function countElement(element) {
//   if (element.classList.contains('counted')) return;

//   let value = +element.getAttribute('data-target');
//   let count = 0;
//   let step = value / 100;
  
//   element.classList.add('counting');

//   const interval = setInterval(() => {
//     count += step;
//     if (count >= value) {
//       count = value;
//       clearInterval(interval);

//       element.classList.remove('counting');
//       element.classList.add('counted');
//     }
//     element.textContent = Math.round(count) + "%";
//   }, 10);
// }

function buttonAgendar() {
  document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo-container');
    let intervalId = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animation if not already running
          if (!intervalId) {
            logo.classList.add('animate');

            intervalId = setInterval(() => {
              logo.classList.toggle('animate');
            }, 3000);
          }
        } else {
          // Stop animation and clear interval
          logo.classList.remove('animate');
          clearInterval(intervalId);
          intervalId = null;
        }
      });
    }, {
      threshold: 0.2
    });

    observer.observe(logo);
  });
}

function spin() {
  const slider = document.querySelector('.slider');
  const items = document.querySelectorAll('.slider .item');
  const quantity = parseInt(slider.style.getPropertyValue('--quantity'));

  const sliderWidth = slider.offsetWidth;
  const translateZ = sliderWidth * 2.6;

  items.forEach((item, index) => {
    const angle = (360 / quantity) * index;
    item.style.transform = `rotateY(${angle}deg) translateZ(${translateZ}px)`;
  });


  // 📐 Set section height to contain the orbit visually
  const orbitHeight = translateZ + 1000;
  slider.parentElement.style.height = `${orbitHeight}px`;
}

function getAverageColor(img) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Tamaño reducido para procesar más rápido
  const width = canvas.width = 20;
  const height = canvas.height = 20;

  context.drawImage(img, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);
  const data = imageData.data;

  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];     // R
    g += data[i + 1]; // G
    b += data[i + 2]; // B
    count++;
  }

  // Promedios
  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  return [r, g, b];
}

function showFocus() {
  const images = document.querySelectorAll('.slider img');
  const focusImg = document.getElementById('focus-img');
  const focusTitle = document.getElementById('focus-title');
  const focusDesc = document.getElementById('focus-desc');
  const focusContent = document.querySelector('.focus-content');
  const focusLink = document.querySelector('#focus-view a');

  images.forEach(img => {
    img.addEventListener('click', () => {
      const parentItem = img.closest('.item');
      const link = parentItem?.dataset.link || '#call';

      focusImg.src = img.src;
      focusTitle.textContent = img.dataset.title;
      focusDesc.textContent = img.dataset.desc;
      focusLink.href = link;
      if (link === '#call') {
        focusLink.innerHTML = `<i class="fa-solid fa-phone"></i>`;
        focusLink.classList.remove('demo');
      }
      else{
        focusLink.innerHTML = 'Ver Producto';
        focusLink.classList.add('demo');
      }

      focusView.classList.remove('hidden');

      focusImg.onload = () => {
        try {
          const [r, g, b] = getAverageColor(focusImg);
          const adjusted = `rgba(${r}, ${g}, ${b}, 0.25)`; // fondo suave
          focusContent.style.backgroundColor = adjusted;
        } catch (err) {
          console.warn("No se pudo obtener el color:", err);
        }
      };

      slider.style.animationPlayState = 'paused';
    });
  });

  focusView.addEventListener('click', (e) => {
    if (e.target === focusView) {
      closeFocus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closeFocus();
    }
  });
}

function closeFocus() {
  focusView.classList.add('hidden');
  slider.style.animationPlayState = 'running';
}

// Show articles
