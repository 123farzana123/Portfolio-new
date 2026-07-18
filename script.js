document.addEventListener("DOMContentLoaded", () => {

  /* MOBILE NAV */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("primary-nav");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // close menu after a link is tapped (mobile)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* CONTACT FORM (Formspree + success state) */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("successMessage");
  const button = document.getElementById("submitBtn");

  if (form && success && button) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      button.textContent = "Sending...";
      button.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          success.style.display = "grid";
          form.reset();
          setTimeout(() => { success.style.display = "none"; }, 3000);
        } else {
          alert("Something went wrong. Please try again or email me directly.");
        }
      } catch (error) {
        alert("Network error. Please check your connection.");
      }

      button.textContent = "Send Message";
      button.disabled = false;
    });
  }

});
