const items = document.querySelectorAll('.Lslider .item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let start = 0;
let N = items.length - 1;
let active = 0;

nextBtn.onclick = () => {
  active = ++active%(N+1);
  setSlider();
}
prevBtn.onclick = () => {
  active--;
  if(active < 0) active = N;
  setSlider();
}

const setSlider = () => {
  let oldActive = document.querySelector('.Lslider .item.active');
  if(oldActive) oldActive.classList.remove('active');
  items[active].classList.add('active');
}

const setDiameter = () => {
  const slider = document.querySelector('.Lslider');
  const wSlider = slider.offsetWidth;
  const hSlider = slider.offsetHeight;
  let diameter = Math.sqrt(Math.pow(wSlider, 2) + Math.pow(hSlider, 2));
  document.documentElement.style.setProperty('--diameter', diameter + 'px');
}

setDiameter();

window.addEventListener('resize', setDiameter);