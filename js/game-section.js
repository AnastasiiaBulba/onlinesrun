// Game Section JavaScript functionality

function initGameSection() {
  const gameSection = document.querySelector(".game-section");
  if (!gameSection) return;

  const gameFrame = gameSection.querySelector(".game-frame");
  const iframe = gameSection.querySelector("iframe");

  if (!gameFrame || !iframe) return;

  // Add loading state
  gameFrame.classList.add("loading");

  // Handle iframe load
  iframe.addEventListener("load", function () {
    gameFrame.classList.remove("loading");
    gameFrame.classList.add("fade-in");

    // Add success animation
    gameFrame.style.animation = "fadeIn 0.5s ease-out";
  });

  // Handle iframe error
  iframe.addEventListener("error", function () {
    gameFrame.classList.remove("loading");

    // Show error message
    gameFrame.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-primary);">
                <h3>Game Loading Error</h3>
                <p>Sorry, the game couldn't be loaded. Please try refreshing the page.</p>
                <button onclick="location.reload()" style="
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">Refresh Page</button>
            </div>
        `;
  });

  // Add hover effects to game frame
  gameFrame.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)";
  });

  gameFrame.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "var(--shadow-lg)";
  });

  // Add click effects
  gameFrame.addEventListener("click", function () {
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  // Add keyboard navigation
  gameFrame.setAttribute("tabindex", "0");
  gameFrame.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      iframe.focus();
    }
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const gameObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  gameObserver.observe(gameSection);

  // Add responsive iframe sizing
  function resizeIframe() {
    const containerWidth = gameFrame.offsetWidth;
    const aspectRatio = 4 / 3; // 800x600 aspect ratio

    if (window.innerWidth <= 767) {
      // Mobile: full width, height based on aspect ratio
      iframe.style.width = "100%";
      iframe.style.height = `${containerWidth / aspectRatio}px`;
    } else if (window.innerWidth <= 1279) {
      // Tablet: max width 600px
      const maxWidth = Math.min(600, containerWidth);
      iframe.style.width = `${maxWidth}px`;
      iframe.style.height = `${maxWidth / aspectRatio}px`;
    } else {
      // Desktop: max width 800px
      const maxWidth = Math.min(800, containerWidth);
      iframe.style.width = `${maxWidth}px`;
      iframe.style.height = `${maxWidth / aspectRatio}px`;
    }
  }

  // Initial resize
  resizeIframe();

  // Resize on window resize
  window.addEventListener("resize", utils.debounce(resizeIframe, 250));

  // Add focus management for iframe
  iframe.addEventListener("focus", function () {
    gameFrame.style.borderColor = "var(--secondary-color)";
  });

  iframe.addEventListener("blur", function () {
    gameFrame.style.borderColor = "var(--primary-color)";
  });

  // Add loading animation
  const loadingText = gameFrame.querySelector("::after");
  if (loadingText) {
    loadingText.style.animation = "loadingPulse 1.5s infinite";
  }

  console.log("Game section initialized");
}

// Export function for use in main.js
window.initGameSection = initGameSection;
