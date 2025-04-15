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