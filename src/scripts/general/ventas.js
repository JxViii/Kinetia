const video = document.querySelector('.video-container video');

video.pause();

video.addEventListener("click", () => {
  if (!bloqueoInicial) return; // Ignora clics antes de que el video esté listo

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

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
    title.style.visibility = 'visible';
    p.style.visibility = 'visible';
  })

  item.addEventListener('mouseleave', () => {
    title.style.visibility = 'hidden';
    p.style.visibility = 'hidden';
  })

});