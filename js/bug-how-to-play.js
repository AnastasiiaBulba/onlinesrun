// How to Play JavaScript functionality

async function initHowToPlay() {
  const howToPlayContainer = document.getElementById("how-to-play-container");
  if (!howToPlayContainer) return;

  try {
    // Load how-to-play data from JSON
    const data = await utils.loadJSON("./data/how-to-play.json");
    if (!data || !data.instructions) {
      console.error("Failed to load how-to-play data");
      return;
    }

    // Create how-to-play HTML
    const howToPlayHTML = data.instructions
      .map(
        (instruction) => `
            <div class="instruction-card fade-in" data-aos="fade-up">
                <div class="instruction-number">${instruction.number}</div>
                <h3 class="instruction-title">${instruction.title}</h3>
                <p class="instruction-description">${instruction.description}</p>
                <div class="instruction-tip">${instruction.tip}</div>
            </div>
        `
      )
      .join("");

    howToPlayContainer.innerHTML = howToPlayHTML;

    // Add animation classes
    const instructionCards =
      howToPlayContainer.querySelectorAll(".instruction-card");
    instructionCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.1}s`;

      // Add hover effects
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.02)";
        const number = this.querySelector(".instruction-number");
        if (number) {
          number.style.transform = "scale(1.1)";
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        const number = this.querySelector(".instruction-number");
        if (number) {
          number.style.transform = "scale(1)";
        }
      });
    });

    // Add intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const howToPlayObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    instructionCards.forEach((card) => {
      howToPlayObserver.observe(card);
    });

    // Add click effects
    instructionCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Add temporary click effect
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      });
    });

    // Add keyboard navigation
    instructionCards.forEach((card, index) => {
      card.setAttribute("tabindex", "0");
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Add tip highlight effects
    const tips = howToPlayContainer.querySelectorAll(".instruction-tip");
    tips.forEach((tip) => {
      tip.addEventListener("mouseenter", function () {
        this.style.background = "rgba(255, 215, 0, 0.2)";
        this.style.transform = "scale(1.02)";
      });

      tip.addEventListener("mouseleave", function () {
        this.style.background = "rgba(255, 215, 0, 0.1)";
        this.style.transform = "scale(1)";
      });
    });

    console.log("How to Play loaded successfully");
  } catch (error) {
    console.error("Error loading how-to-play:", error);

    // Fallback content
    howToPlayContainer.innerHTML = `
            <div class="instruction-card fade-in">
                <div class="instruction-number">1</div>
                <h3 class="instruction-title">Aim Carefully</h3>
                <p class="instruction-description">Look for clusters where at least two candies of the same type are already waiting.</p>
                <div class="instruction-tip">Take your time to plan your shots - precision is key!</div>
            </div>
            <div class="instruction-card fade-in">
                <div class="instruction-number">2</div>
                <h3 class="instruction-title">Throw with Precision</h3>
                <p class="instruction-description">Click and drag to aim your candy, then release to throw.</p>
                <div class="instruction-tip">Practice makes perfect - start with easy targets!</div>
            </div>
            <div class="instruction-card fade-in">
                <div class="instruction-number">3</div>
                <h3 class="instruction-title">Create Perfect Trios</h3>
                <p class="instruction-description">Only groups of exactly three matching candies will score points.</p>
                <div class="instruction-tip">Remember: exactly three candies, no more, no less!</div>
            </div>
        `;
  }
}

// Export function for use in main.js
window.initHowToPlay = initHowToPlay;
