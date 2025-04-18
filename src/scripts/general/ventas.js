const video = document.querySelector('.video-container video');

video.pause();

video.addEventListener("ended", () => {
    video.currentTime = 0;  
    video.pause();    
    video.load();           
});

const items = document.querySelectorAll('.k-content.ventas .process .item');

items.forEach(item => {
  const title = item.querySelector('h3');
  const p = item.querySelector('p');

  item.addEventListener('mouseenter', () => {
    items.forEach(other => {
      if (other !== item && other.classList.contains('activo')) {
        other.classList.remove('activo');
        other.querySelector('h3').style.display = 'none';
        other.querySelector('p').style.display = 'none';
      }
    });
      if (!item.classList.contains('activo')) {
        item.classList.add('hovered');
        title.style.display = 'initial';
        p.style.display = 'initial';
      }
  });

  item.addEventListener('mouseleave', () => {
    if (!item.classList.contains('activo')) {
      item.classList.remove('hovered');
      title.style.display = 'none';
      p.style.display = 'none';
    }
  });

  item.addEventListener('click', () => {
    const isActive = item.classList.contains('activo');

    if (isActive) {
      // Si ya está activo, lo desactiva
      item.classList.remove('activo');
      title.style.display = 'none';
      p.style.display = 'none';
    } else {
      item.classList.add('activo');
      title.style.display = 'initial';
      p.style.display = 'initial';
      // Desactiva los demás
      items.forEach(other => {
        other.classList.remove('hovered');
        if (other !== item) {
          other.querySelector('h3').style.display = 'none';
          other.querySelector('p').style.display = 'none';
        }
      });
    }
  });
});

let index = 0; // define esto fuera de la función

function slide(direction) {
  const items = slider.querySelectorAll(".item");

  const max = items.length - 1;

  if (direction === "left" && index > 0) {
    index--;
  } else if (direction === "right" && index < max) {
    index++;
  }

  const targetItem = items[index];
  slider.scrollTo({
    left: targetItem.offsetLeft - slider.offsetLeft,
    behavior: "smooth"
  });

  // Forzar update inmediato
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function updateActiveItemOnScroll() {
  const items = slider.querySelectorAll(".k-content.ventas .beneficios-container .slider-wrapper .slider .item");

  let closestIndex = 0;
  let closestDistance = Infinity;

  items.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect();
    const sliderRect = slider.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const sliderCenter = sliderRect.left + sliderRect.width / 2;
    const distance = Math.abs(sliderCenter - itemCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  // Quitar todas las clases 'active' y aplicar solo a la más centrada
  items.forEach((item, idx) => {
    item.classList.toggle("active", idx === closestIndex);
  });

  // Actualiza el índice global si usas flechas también
  index = closestIndex;
}

const slider = document.getElementById("beneficiosSlider");
slider.addEventListener("scroll", () => {
  clearTimeout(slider._scrollTimeout);
  slider._scrollTimeout = setTimeout(updateActiveItemOnScroll, 10);
});


// Función para activar la animación cuando se ve el elemento
function activarAnimacionProceso() {
  const elemento = document.querySelectorAll('.k-content.ventas .process .item');
  if (!elemento) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Activamos la animación
        elemento.forEach( (el) => {
          el.style.animationPlayState = 'running';
          observer.unobserve(entry.target); // Solo una vez
          setTimeout( () => {
            el.style.animation = 'gradientShift 4s ease infinite';
          }, 4300);
        });
      }
    });
  }, {
    threshold: 0.3 // Puedes ajustar este valor
  });

  observer.observe(elemento[0]);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', activarAnimacionProceso);
