// Reviews JavaScript functionality

async function initReviews() {
  const reviewsContainer = document.getElementById("reviews-container");
  if (!reviewsContainer) return;

  try {
    // Load reviews data from JSON
    const data = await utils.loadJSON("./data/reviews.json");
    if (!data || !data.reviews) {
      console.error("Failed to load reviews data");
      return;
    }

    // Create reviews HTML
    const reviewsHTML = data.reviews
      .map(
        (review) => `
            <div class="review-card fade-in" data-aos="fade-up">
                <div class="review-header">
                    <div class="review-avatar">
                        ${utils.createSVGAvatar(review.name)}
                    </div>
                    <div class="review-info">
                        <div class="review-name">${review.name}</div>
                        <div class="review-rating">
                            ${utils.generateStarRating(review.rating)}
                        </div>
                    </div>
                </div>
                <div class="review-text">${review.text}</div>
            </div>
        `
      )
      .join("");

    reviewsContainer.innerHTML = reviewsHTML;

    // Add animation classes
    const reviewCards = reviewsContainer.querySelectorAll(".review-card");
    reviewCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.1}s`;

      // Add hover effects
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
        const avatar = this.querySelector(".review-avatar");
        if (avatar) {
          avatar.style.transform = "scale(1.1)";
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
        const avatar = this.querySelector(".review-avatar");
        if (avatar) {
          avatar.style.transform = "scale(1)";
        }
      });
    });

    // Add intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const reviewsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    reviewCards.forEach((card) => {
      reviewsObserver.observe(card);
    });

    // Add click effects
    reviewCards.forEach((card) => {
      card.addEventListener("click", function () {
        // Add temporary click effect
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);
      });
    });

    // Add keyboard navigation
    reviewCards.forEach((card, index) => {
      card.setAttribute("tabindex", "0");
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });
    });

    // Add star rating hover effects
    const stars = reviewsContainer.querySelectorAll(".star");
    stars.forEach((star) => {
      star.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.2)";
        this.style.color = "var(--secondary-color)";
      });

      star.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
        if (this.classList.contains("filled")) {
          this.style.color = "var(--secondary-color)";
        } else {
          this.style.color = "var(--text-muted)";
        }
      });
    });

    // Add quote animation effects
    const reviewTexts = reviewsContainer.querySelectorAll(".review-text");
    reviewTexts.forEach((text) => {
      text.addEventListener("mouseenter", function () {
        const before = this.querySelector("::before");
        const after = this.querySelector("::after");
        if (before) before.style.opacity = "0.6";
        if (after) after.style.opacity = "0.6";
      });

      text.addEventListener("mouseleave", function () {
        const before = this.querySelector("::before");
        const after = this.querySelector("::after");
        if (before) before.style.opacity = "0.3";
        if (after) after.style.opacity = "0.3";
      });
    });

    console.log("Reviews loaded successfully");
  } catch (error) {
    console.error("Error loading reviews:", error);

    // Fallback content
    reviewsContainer.innerHTML = `
            <div class="review-card fade-in">
                <div class="review-header">
                    <div class="review-avatar">
                        ${utils.createSVGAvatar("Sarah Johnson")}
                    </div>
                    <div class="review-info">
                        <div class="review-name">Sarah Johnson</div>
                        <div class="review-rating">
                            ${utils.generateStarRating(5)}
                        </div>
                    </div>
                </div>
                <div class="review-text">Absolutely addictive! The candy-tossing mechanics are so satisfying.</div>
            </div>
            <div class="review-card fade-in">
                <div class="review-header">
                    <div class="review-avatar">
                        ${utils.createSVGAvatar("Mike Chen")}
                    </div>
                    <div class="review-info">
                        <div class="review-name">Mike Chen</div>
                        <div class="review-rating">
                            ${utils.generateStarRating(5)}
                        </div>
                    </div>
                </div>
                <div class="review-text">Perfect casual game for quick breaks. The explosions are so satisfying!</div>
            </div>
            <div class="review-card fade-in">
                <div class="review-header">
                    <div class="review-avatar">
                        ${utils.createSVGAvatar("Emma Davis")}
                    </div>
                    <div class="review-info">
                        <div class="review-name">Emma Davis</div>
                        <div class="review-rating">
                            ${utils.generateStarRating(4)}
                        </div>
                    </div>
                </div>
                <div class="review-text">Great game to relax with. The colorful graphics are beautiful!</div>
            </div>
        `;
  }
}

// Export function for use in main.js
window.initReviews = initReviews;
