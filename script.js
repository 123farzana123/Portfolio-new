/* =========================
   MOBILE NAVIGATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("primary-nav");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  /* =========================
     CONTACT FORM (FORMSPREE + SUCCESS UI)
  ========================= */

  const form = document.getElementById("contactForm");
  const success = document.getElementById("successMessage");
  const button = document.getElementById("submitBtn");

  if (form && success && button) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Loading state
      button.textContent = "Sending...";
      button.disabled = true;

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          // Show success animation overlay
          success.style.display = "grid";

          // Reset form fields
          form.reset();

          // Hide success message after 3 seconds
          setTimeout(() => {
            success.style.display = "none";
          }, 3000);

        } else {
          alert("Something went wrong. Please try again.");
        }

      } catch (error) {
        alert("Network error. Please check your connection.");
      }

      // Reset button state
      button.textContent = "Send Message";
      button.disabled = false;
    });
  }

  /* =========================
    AI CHATBOT
  ========================= */

  const chatToggle = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const closeChat = document.getElementById("close-chat");
  const chatGreeting = document.getElementById("chat-greeting");
  const chatForm = document.getElementById("chat-form");

  if (
    chatToggle &&
    chatWidget &&
    closeChat &&
    chatGreeting &&
    chatForm
  ) {

    /* Open Chat */
    chatToggle.addEventListener("click", () => {
      chatWidget.style.display = "flex";
      chatGreeting.style.display = "none";
    });

    /* Close Chat */
    closeChat.addEventListener("click", () => {
      chatWidget.style.display = "none";
    });

    /* Welcome Bubble */
    setTimeout(() => {
      chatGreeting.classList.add("show");
    }, 2000);

    /* Hide Bubble */
    setTimeout(() => {
      chatGreeting.classList.remove("show");
    }, 9000);

    /* Send Message */
    chatForm.addEventListener("submit", (e) => {

      e.preventDefault();

      const input = document.getElementById("userInput");
      const text = input.value.trim();

      if (!text) return;

      addMessage(text, "user-message");

      setTimeout(() => {
        addMessage(getBotResponse(text), "bot-message");
      }, 500);

      input.value = "";
    });

  }
});

function addMessage(message, className) {

  const chatbox = document.getElementById("chatbox");

  const div = document.createElement("div");

  div.className = className;
  div.textContent = message;

  chatbox.appendChild(div);

  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(message) {

  message = message.toLowerCase();

  if (message.includes("skill")) {
    return "Farzana's skills include HTML, CSS, JavaScript, PHP, Python, MySQL, React, WordPress, SEO, AI APIs, and responsive web development.";
  }

  if (message.includes("project")) {
    return "You can view Farzana's portfolio projects in the Projects section.";
  }

  if (message.includes("education")) {
    return "Farzana graduated with an Associate of Applied Science (AAS) in Web Development.";
  }

  if (message.includes("experience")) {
    return "Farzana has experience building responsive websites, web applications, AI-powered tools, and WordPress solutions.";
  }

  if (message.includes("contact")) {
    return "Use the contact form or connect through LinkedIn, GitHub, or email.";
  }

  if (message.includes("github")) {
    return "GitHub: github.com/123farzana123";
  }

  if (message.includes("linkedin")) {
    return "LinkedIn: linkedin.com/in/farzana-yaqubi";
  }

  return "I can answer questions about Farzana's skills, projects, education, experience, GitHub, LinkedIn, and contact information.";
}
