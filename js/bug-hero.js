// Hero JavaScript functionality

function initHero() {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  // Add scroll-triggered animations
  const heroContent = heroSection.querySelector(".hero-content");
  const heroImage = heroSection.querySelector(".hero-image");

  // Add click effects to hero elements
  const heroTitle = heroSection.querySelector("h1");
  const heroText = heroSection.querySelector("p");

  if (heroTitle) {
    heroTitle.addEventListener("click", function () {
      this.style.transform = "scale(1.05)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 200);
    });
  }

  if (heroText) {
    heroText.addEventListener("click", function () {
      this.style.color = "var(--secondary-color)";
      setTimeout(() => {
        this.style.color = "var(--text-secondary)";
      }, 500);
    });
  }

  // Add keyboard navigation
  heroSection.setAttribute("tabindex", "0");
  heroSection.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Scroll to game section
      const gameSection = document.querySelector(".game-section");
      if (gameSection) {
        gameSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Add intersection observer for hero animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");

        // Add staggered animations to hero elements
        const elements = entry.target.querySelectorAll("h1, p, .hero-image");
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, index * 200);
        });
      }
    });
  }, observerOptions);

  heroObserver.observe(heroSection);

  console.log("Hero section initialized");
}

// Export function for use in main.js
window.initHero = initHero;
