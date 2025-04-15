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
