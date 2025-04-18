const menu = document.getElementById("dropdownContent");
const submenu = document.getElementById("submenuContent");
const maintenance = document.querySelector('.maintenance');

function toggleDropdown() {
  menu.classList.toggle("show");
  if(!menu.classList.contains('show')){
    submenu.classList.remove('show');
  }
}

// Close dropdown when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdown = document.querySelector(".dropdown-content.show");
    let sub = document.querySelector(".dropdown-content.sub.show");

    if(dropdown){
      if(sub){
        setTimeout( () => dropdown.classList.remove('show'), 300);
        sub.classList.remove('show');
      }
      else
        dropdown.classList.remove('show');
    }

    if (maintenance)
      maintenance.classList.remove('visually-hidden');
  }
}

function toggleSubmenu(event) {
  // event.preventDefault(); // Evita que se redirija
  event.stopPropagation(); // Previene que el clic se propague
  // Alterna clase activa en el submenú actual
  submenu.classList.toggle('show');
}

// Cierra el submenú al hacer clic fuera

document.addEventListener('click', function () {
  const dropdown = document.querySelector('.dropdown-content');

  if (!dropdown || !maintenance) return; // Seguridad por si no existen

  if (dropdown.classList.contains('show')) {
    maintenance.classList.add('visually-hidden');
  } else {
    maintenance.classList.remove('visually-hidden');
  }
});
