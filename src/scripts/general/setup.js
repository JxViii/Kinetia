// Initialize directional scroll animations
setupScrollAnimations('scroll-animate-base');

buttonAgendar();

console.log('updated cache');

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.classList.add("animate");

    // Remove the class after animation ends, so it can re-trigger
    link.addEventListener("animationend", () => {
      link.classList.remove("animate");
    }, { once: true }); // only once per hover
  });
});

  // Mostrar el modal
const modal = document.getElementById("newsletterModal");
const form = document.getElementById("newsletter-form");
const message = document.getElementById("newsletter-message");

// Abrir modal
function openNewsletterModal() {
  modal.classList.remove("hidden");
}

// Cerrar modal
function closeNewsletterModal() {
  modal.classList.add("hidden");

  // Elimina #newsletter de la URL sin recargar
  if (window.location.hash === "#newsletter") {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
}

// Detectar navegación con hash
window.addEventListener("hashchange", () => {
  if (window.location.hash === "#newsletter") {
    openNewsletterModal();
  } else {
    closeNewsletterModal();
  }
});

// Detectar carga inicial
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "#newsletter") {
    openNewsletterModal();
  }
});

// Click en el enlace "Newsletter"
document.querySelector('a[href="#newsletter"]')?.addEventListener("click", function (e) {
  e.preventDefault();
  history.pushState(null, "", "#newsletter");
  openNewsletterModal();
});

// Tecla ESC para cerrar
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && window.location.hash === "#newsletter") {
    closeNewsletterModal();
  }
});

// Envío del formulario
form?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  console.log("Correo enviado:", email);
  message.textContent = "¡Gracias por suscribirte!";
  form.reset();
});

// Clic en botón de cerrar
function toggleNewsletterModal() {
  if (window.location.hash === "#newsletter") {
    closeNewsletterModal();
  } else {
    history.pushState(null, "", "#newsletter");
    openNewsletterModal();
  }
}

