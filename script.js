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

  /* CASE STUDIES — click to open/close */
  const caseLinks = document.querySelectorAll('.card-link[href^="#case-"]');

  caseLinks.forEach(link => {
    const targetId = link.getAttribute("href").slice(1);
    const article = document.getElementById(targetId);
    if (!article) return;

    // add a "Close" link at the end of the article, once
    const closeLink = document.createElement("a");
    closeLink.textContent = "Close ↑";
    closeLink.className = "case-close-link";
    closeLink.href = "#case-studies";
    article.appendChild(closeLink);

    const openArticle = (e) => {
      e.preventDefault();
      document.querySelectorAll('#case-studies article[id^="case-"].is-open')
        .forEach(open => { if (open !== article) open.classList.remove("is-open"); });
      article.classList.add("is-open");
      article.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    link.addEventListener("click", openArticle);

    closeLink.addEventListener("click", (e) => {
      e.preventDefault();
      article.classList.remove("is-open");
      document.getElementById("case-studies").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* GALLERY CAROUSEL */
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-track img');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let current = 0;

    const goTo = (index) => {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    };

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  });

});
