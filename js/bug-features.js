// Features JavaScript functionality

async function initFeatures() {
  const featuresContainer = document.getElementById("features-container");
  if (!featuresContainer) return;

  try {
    // Load features data from JSON
    const data = await utils.loadJSON("./data/features.json");
    if (!data || !data.features) {
      console.error("Failed to load features data");
      return;
    }

    // Create features HTML
    const featuresHTML = data.features
      .map(
        (feature) => `
            <div class="feature-card fade-in" data-aos="fade-up">
                <div class="feature-icon">
                    ${feature.icon}
                </div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `
      )
      .join("");

    featuresContainer.innerHTML = featuresHTML;

    // Add animation classes
    const featureCards = featuresContainer.querySelectorAll(".feature-card");
    featureCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.1}s`;

      // Add hover effects
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
        const icon = this.querySelector(".feature-icon");
        if (icon) {
          icon.style.transform = "scale(1.1) rotate(5deg)";
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        const icon = this.querySelector(".feature-icon");
        if (icon) {
          icon.style.transform = "scale(1) rotate(0deg)";
        }
      });
    });

    // Add intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const featuresObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    featureCards.forEach((card) => {
      featuresObserver.observe(card);
    });

    // Add click effects
    featureCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Add temporary click effect
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      });
    });

    // Add keyboard navigation
    featureCards.forEach((card, index) => {
      card.setAttribute("tabindex", "0");
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });

    console.log("Features loaded successfully");
  } catch (error) {
    console.error("Error loading features:", error);

    // Fallback content
    featuresContainer.innerHTML = `
            <div class="feature-card fade-in">
                <div class="feature-icon">🎯</div>
                <h3 class="feature-title">Precision Whacking</h3>
                <p class="feature-description">Master the art of precise bug elimination with intuitive controls.</p>
            </div>
            <div class="feature-card fade-in">
                <div class="feature-icon">💥</div>
                <h3 class="feature-title">Satisfying Hits</h3>
                <p class="feature-description">Experience thrilling explosions when you successfully whack bugs.</p>
            </div>
            <div class="feature-card fade-in">
                <div class="feature-icon">🏆</div>
                <h3 class="feature-title">Score System</h3>
                <p class="feature-description">Compete for high scores with our dynamic scoring system.</p>
            </div>
            <div class="feature-card fade-in">
                <div class="feature-icon">🐛</div>
                <h3 class="feature-title">Diverse Bug Types</h3>
                <p class="feature-description">Face various insect species with unique behaviors and point values.</p>
            </div>
            <div class="feature-card fade-in">
                <div class="feature-icon">⚡</div>
                <h3 class="feature-title">Fast-Paced Action</h3>
                <p class="feature-description">Quick reflexes and sharp eyes are your best weapons.</p>
            </div>
            <div class="feature-card fade-in">
                <div class="feature-icon">♾️</div>
                <h3 class="feature-title">Endless Fun</h3>
                <p class="feature-description">Never-ending entertainment with infinite replayability.</p>
            </div>
        `;
  }
}

// Export function for use in main.js
window.initFeatures = initFeatures;
