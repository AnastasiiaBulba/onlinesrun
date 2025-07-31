// Field JavaScript functionality

function initField() {
  const fieldSection = document.querySelector(".field-section");
  if (!fieldSection) return;

  const fieldImage = fieldSection.querySelector(".field-image img");
  const fieldText = fieldSection.querySelector(".field-text");

  if (!fieldImage) return;

  // Add image loading animation
  fieldImage.addEventListener("load", function () {
    this.style.opacity = "1";
    this.style.transform = "scale(1)";
  });

  // Add hover effects to field image
  fieldImage.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4)";
  });

  fieldImage.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "var(--shadow-lg)";
  });

  // Add click effects
  fieldImage.addEventListener("click", function () {
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  // Add keyboard navigation
  fieldImage.setAttribute("tabindex", "0");
  fieldImage.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fieldObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");

        // Add staggered animations to field elements
        const elements = entry.target.querySelectorAll(
          ".field-text, .field-image"
        );
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, index * 200);
        });
      }
    });
  }, observerOptions);

  fieldObserver.observe(fieldSection);

  // Add mouse move effect to field image
  fieldImage.addEventListener(
    "mousemove",
    utils.throttle((e) => {
      const rect = fieldImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = ((x - centerX) / centerX) * 5;
      const moveY = ((y - centerY) / centerY) * 5;

      fieldImage.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    }, 16)
  );

  // Reset transform on mouse leave
  fieldImage.addEventListener("mouseleave", () => {
    fieldImage.style.transform = "scale(1) translate(0, 0)";
  });

  // Add text highlight effects
  if (fieldText) {
    const strongElements = fieldText.querySelectorAll("strong");
    strongElements.forEach((strong) => {
      strong.addEventListener("mouseenter", function () {
        this.style.textShadow = "0 0 15px rgba(255, 215, 0, 0.6)";
      });

      strong.addEventListener("mouseleave", function () {
        this.style.textShadow = "0 0 5px rgba(255, 215, 0, 0.3)";
      });
    });

    const emElements = fieldText.querySelectorAll("em");
    emElements.forEach((em) => {
      em.addEventListener("mouseenter", function () {
        this.style.color = "var(--primary-color)";
      });

      em.addEventListener("mouseleave", function () {
        this.style.color = "var(--primary-color)";
      });
    });
  }

  // Add glow effect to field image container
  const fieldImageContainer = fieldSection.querySelector(".field-image");
  if (fieldImageContainer) {
    fieldImageContainer.addEventListener("mouseenter", function () {
      this.style.animation = "fieldGlowHover 2s ease-in-out infinite";
    });

    fieldImageContainer.addEventListener("mouseleave", function () {
      this.style.animation = "fieldGlow 4s ease-in-out infinite";
    });
  }

  // Add responsive image sizing
  function resizeFieldImage() {
    const containerWidth = fieldImageContainer?.offsetWidth || 800;
    const maxWidth = Math.min(800, containerWidth);

    fieldImage.style.maxWidth = `${maxWidth}px`;
  }

  // Initial resize
  resizeFieldImage();

  // Resize on window resize
  window.addEventListener("resize", utils.debounce(resizeFieldImage, 250));

  console.log("Field section initialized");
}

// Export function for use in main.js
window.initField = initField;
