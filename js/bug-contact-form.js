// Contact Form Handler for Whack A Bug
document.addEventListener("DOMContentLoaded", function () {
  console.log("Bug Contact page initialized");

  // Initialize header and footer
  if (typeof initHeader === "function") {
    console.log("Initializing header");
    initHeader();
  } else {
    console.log("initHeader function not found");
  }

  if (typeof initFooter === "function") {
    console.log("Initializing footer");
    initFooter();
  } else {
    console.log("initFooter function not found");
  }

  const form = document.getElementById("contact-form");
  console.log("Form element:", form);

  if (!form) {
    console.log("Contact form not found");
    return;
  }

  console.log("Contact form found, setting up handlers");

  // Subject select restriction
  const subjectSelect = document.getElementById("subject");
  if (subjectSelect) {
    subjectSelect.addEventListener("change", function () {
      console.log("Subject selected:", this.value);
    });
  }

  // Function to clear all form fields
  function clearFormFields() {
    console.log("clearFormFields function called");

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subjectField = document.getElementById("subject");
    const messageField = document.getElementById("message");

    console.log("Fields found:", {
      name: nameField,
      email: emailField,
      subject: subjectField,
      message: messageField,
    });

    if (nameField) {
      console.log("Clearing name field, current value:", nameField.value);
      nameField.value = "";
      console.log("Name field cleared, new value:", nameField.value);
    }

    if (emailField) {
      console.log("Clearing email field, current value:", emailField.value);
      emailField.value = "";
      console.log("Email field cleared, new value:", emailField.value);
    }

    if (subjectField) {
      console.log("Clearing subject field, current value:", subjectField.value);
      subjectField.value = "";
      console.log("Subject field cleared, new value:", subjectField.value);
    }

    if (messageField) {
      console.log("Clearing message field, current value:", messageField.value);
      messageField.value = "";
      console.log("Message field cleared, new value:", messageField.value);
    }

    // Also reset the form
    if (form) {
      console.log("Resetting form");
      form.reset();
    }

    console.log("All form fields cleared");
  }

  // Function to show success popup
  function showSuccessPopup(message) {
    console.log("showSuccessPopup function called with message:", message);

    // Remove any existing popups
    const existingPopup = document.querySelector(".success-popup");
    if (existingPopup) {
      console.log("Removing existing popup");
      existingPopup.remove();
    }

    // Create popup element
    const popup = document.createElement("div");
    popup.className = "success-popup";
    popup.innerHTML = `
      <div class="popup-content">
        <div class="popup-icon">✅</div>
        <div class="popup-message">${message}</div>
        <button class="popup-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;

    // Add styles
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #2ed573, #7bed9f);
      color: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: popupSlideIn 0.5s ease-out;
      min-width: 300px;
      text-align: center;
      border: 3px solid rgba(255, 255, 255, 0.2);
    `;

    // Add popup content styles
    const popupContent = popup.querySelector(".popup-content");
    popupContent.style.cssText = `
      position: relative;
    `;

    // Add icon styles
    const popupIcon = popup.querySelector(".popup-icon");
    popupIcon.style.cssText = `
      font-size: 48px;
      margin-bottom: 15px;
      display: block;
    `;

    // Add message styles
    const popupMessage = popup.querySelector(".popup-message");
    popupMessage.style.cssText = `
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      line-height: 1.4;
    `;

    // Add close button styles
    const popupClose = popup.querySelector(".popup-close");
    popupClose.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 50%;
      transition: all 0.3s ease;
    `;

    popupClose.addEventListener("mouseenter", function () {
      this.style.background = "rgba(255, 255, 255, 0.3)";
      this.style.transform = "scale(1.1)";
    });

    popupClose.addEventListener("mouseleave", function () {
      this.style.background = "rgba(255, 255, 255, 0.2)";
      this.style.transform = "scale(1)";
    });

    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes popupSlideIn {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    `;
    document.head.appendChild(style);

    // Add popup to page
    console.log("Adding popup to page");
    document.body.appendChild(popup);
    console.log("Popup added to page");

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (popup.parentNode) {
        console.log("Auto-removing popup");
        popup.style.animation = "popupSlideOut 0.3s ease-out";
        setTimeout(() => {
          if (popup.parentNode) {
            popup.remove();
            console.log("Popup removed");
          }
        }, 300);
      }
    }, 4000);

    // Add slide out animation
    const slideOutStyle = document.createElement("style");
    slideOutStyle.textContent = `
      @keyframes popupSlideOut {
        from {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
      }
    `;
    document.head.appendChild(slideOutStyle);
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Form submitted");

    // Get form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    console.log("Form data:", { name, email, subject, message });

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });

    // Validation
    let isValid = true;

    // Name validation
    if (!name || name.length < 2) {
      document.getElementById("name-error").textContent =
        "Please enter a valid name";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address";
      isValid = false;
    }

    // Subject validation
    if (!subject) {
      document.getElementById("subject-error").textContent =
        "Please select a subject";
      isValid = false;
    }

    // Message validation
    if (!message || message.length < 10) {
      document.getElementById("message-error").textContent =
        "Message must be at least 10 characters";
      isValid = false;
    }

    console.log("Form validation result:", isValid);

    if (isValid) {
      console.log("Form is valid, clearing fields and showing success message");

      // Clear all form fields immediately
      clearFormFields();

      // Show success message popup
      showSuccessPopup("Data successfully sent!");

      // Clear error messages
      document.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
      });
    } else {
      console.log("Form validation failed");
      showMessage(
        "Please fix the errors in the form before submitting.",
        "error"
      );
    }

    return false;
  });

  // Show message function
  function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll(".message");
    existingMessages.forEach((msg) => msg.remove());

    // Create new message
    const message = document.createElement("div");
    message.className = `message ${type}`;
    message.textContent = text;
    message.style.cssText = `
      display: block;
      margin: 20px 0;
      padding: 15px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
      font-size: 16px;
    `;

    // Insert before form
    form.parentNode.insertBefore(message, form);

    // Scroll to message
    message.scrollIntoView({ behavior: "smooth", block: "center" });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);
  }
});
