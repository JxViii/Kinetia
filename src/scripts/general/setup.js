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
  message.textContent = '';

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
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;

  try {
    // Cambiar la URL al Webhook de n8n
    const response = await fetch("https://kikitochikito.app.n8n.cloud/webhook-test/53886cdf-99b8-474e-80a0-2e9aac576372", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,  // Aquí enviamos el correo electrónico
      })
    });

    // Comprobar la respuesta del Webhook
    if (response.ok) {
      message.textContent = "¡Gracias por suscribirte!";
      form.reset();
    } else {
      const data = await response.json();
      message.textContent = `Error: ${data.error.message || "No se pudo procesar"}`;
    }
  } catch (error) {
    message.textContent = "Hubo un error. Intenta más tarde.";
    console.error("Error al enviar el correo:", error);
  }
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

