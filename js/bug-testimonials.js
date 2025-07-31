// Testimonials JavaScript functionality

function initTestimonials() {
  const testimonialItems = document.querySelectorAll(".testimonial-item");

  if (!testimonialItems.length) return;

  // Add hover effects
  testimonialItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      const avatar = this.querySelector(".author-avatar");
      if (avatar) {
        avatar.style.transform = "scale(1.1) rotate(5deg)";
      }
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      const avatar = this.querySelector(".author-avatar");
      if (avatar) {
        avatar.style.transform = "scale(1) rotate(0deg)";
      }
    });

    // Add click effect
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const testimonialsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  testimonialItems.forEach((item) => {
    testimonialsObserver.observe(item);
  });

  // Add keyboard navigation
  testimonialItems.forEach((item, index) => {
    item.setAttribute("tabindex", "0");

    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add staggered animation to testimonial items
  testimonialItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Add pulse animation to avatars
  const avatars = document.querySelectorAll(".author-avatar");
  avatars.forEach((avatar, index) => {
    setTimeout(() => {
      avatar.style.animation = "pulse 3s infinite";
    }, index * 300);
  });

  // Add click to highlight functionality
  testimonialItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove highlight from all items
      testimonialItems.forEach((i) => i.classList.remove("success"));

      // Add highlight to clicked item
      this.classList.add("success");

      // Remove highlight after 3 seconds
      setTimeout(() => {
        this.classList.remove("success");
      }, 3000);
    });
  });

  // Add responsive behavior
  function handleResize() {
    if (window.innerWidth < 768) {
      testimonialItems.forEach((item) => {
        item.style.margin = "0.5rem";
      });
    } else {
      testimonialItems.forEach((item) => {
        item.style.margin = "";
      });
    }
  }

  window.addEventListener("resize", utils.debounce(handleResize, 250));

  // Add accessibility features
  testimonialItems.forEach((item) => {
    const content = item.querySelector(".testimonial-content p");
    const author = item.querySelector(".author-info h4");
    const role = item.querySelector(".author-info span");

    // Add ARIA labels
    item.setAttribute("role", "button");
    item.setAttribute(
      "aria-label",
      `Testimonial from ${author.textContent}, ${role.textContent}`
    );

    // Add screen reader support
    const srText = document.createElement("span");
    srText.className = "sr-only";
    srText.textContent = `Quote: ${content.textContent}`;
    item.appendChild(srText);
  });

  // Add loading state
  function showLoadingState() {
    testimonialItems.forEach((item) => {
      item.classList.add("loading");
    });
  }

  function hideLoadingState() {
    testimonialItems.forEach((item) => {
      item.classList.remove("loading");
    });
  }

  // Simulate loading on page load
  showLoadingState();
  setTimeout(hideLoadingState, 1000);

  // Add auto-rotation for testimonials (optional)
  let currentTestimonial = 0;

  function rotateTestimonials() {
    testimonialItems.forEach((item, index) => {
      if (index === currentTestimonial) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0) scale(1.02)";
      } else {
        item.style.opacity = "0.7";
        item.style.transform = "translateY(0) scale(1)";
      }
    });

    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
  }

  // Uncomment to enable auto-rotation
  // setInterval(rotateTestimonials, 5000);

  console.log("Testimonials initialized");
}

// Export function for use in main.js
window.initTestimonials = initTestimonials;
