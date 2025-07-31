// Screenshots JavaScript functionality

function initScreenshots() {
  const screenshotItems = document.querySelectorAll(".screenshot-item");

  if (!screenshotItems.length) return;

  // Add click functionality to open screenshots in modal
  screenshotItems.forEach((item, index) => {
    // Add tabindex for keyboard navigation
    item.setAttribute("tabindex", "0");

    // Add click handler
    item.addEventListener("click", function () {
      openScreenshotModal(
        this.querySelector("img").src,
        this.querySelector("h3").textContent,
        this.querySelector("p").textContent
      );
    });

    // Add keyboard navigation
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    // Add hover effects
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    // Add loading animation for images
    const img = item.querySelector("img");
    if (img) {
      img.addEventListener("load", function () {
        this.classList.add("loaded");
      });

      // Fallback for already loaded images
      if (img.complete) {
        img.classList.add("loaded");
      }
    }
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const screenshotsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  screenshotItems.forEach((item) => {
    screenshotsObserver.observe(item);
  });

  // Create modal functionality
  function openScreenshotModal(imageSrc, title, description) {
    // Remove existing modal
    const existingModal = document.querySelector(".screenshot-modal");
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal
    const modal = document.createElement("div");
    modal.className = "screenshot-modal";
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">×</button>
          <div class="modal-image">
            <img src="${imageSrc}" alt="${title}" />
          </div>
          <div class="modal-info">
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        </div>
      </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement("style");
    modalStyles.textContent = `
      .screenshot-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease-out;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
      }

      .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: var(--background-color);
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-lg);
        animation: slideInUp 0.3s ease-out;
      }

      .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 1;
        transition: var(--transition-fast);
      }

      .modal-close:hover {
        background: var(--primary-color);
        transform: scale(1.1);
      }

      .modal-image {
        width: 100%;
        max-height: 70vh;
        overflow: hidden;
      }

      .modal-image img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      .modal-info {
        padding: var(--spacing-lg);
        color: var(--text-primary);
      }

      .modal-info h3 {
        margin-bottom: var(--spacing-sm);
        color: var(--secondary-color);
      }

      .modal-info p {
        margin: 0;
        opacity: 0.9;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .modal-content {
          max-width: 95vw;
          max-height: 95vh;
        }

        .modal-info {
          padding: var(--spacing-md);
        }
      }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Add close functionality
    const closeBtn = modal.querySelector(".modal-close");
    const overlay = modal.querySelector(".modal-overlay");

    function closeModal() {
      modal.style.animation = "fadeOut 0.3s ease-out";
      setTimeout(() => {
        modal.remove();
        modalStyles.remove();
      }, 300);
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Add keyboard support
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when modal is closed
    modal.addEventListener("animationend", function () {
      if (modal.style.animation.includes("fadeOut")) {
        document.body.style.overflow = "";
      }
    });
  }

  // Add swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  screenshotItems.forEach((item) => {
    item.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    item.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      // Swipe detected - could be used for navigation
      console.log("Swipe detected:", diff > 0 ? "left" : "right");
    }
  }

  console.log("Screenshots initialized");
}

// Export function for use in main.js
window.initScreenshots = initScreenshots;
