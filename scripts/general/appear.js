
function appear(caller) {
  console.log('working...');
  const elements = document.querySelectorAll(`.${caller}`);
  const observer = new IntersectionObserver(entries=> {
    entries.forEach((entry, index) => {
      if(entry.isIntersecting)
        setTimeout(()=>{
          entry.target.classList.add("visible");
        }, index * 1200);
    });
  }, {threshold: 0.5});

  elements.forEach(item => observer.observe(item));
}