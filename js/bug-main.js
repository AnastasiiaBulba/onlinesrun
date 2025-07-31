// Main JavaScript file for Whack A Bug website

// Global variables
const currentYear = new Date().getFullYear();

// Back to top button functionality
function initBackToTop() {
  // Create back to top button
  const backToTopBtn = document.createElement("div");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.innerHTML = "↑";
  backToTopBtn.setAttribute("aria-label", "Back to top");
  document.body.appendChild(backToTopBtn);

  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add scroll event listener
  window.addEventListener("scroll", utils.throttle(toggleBackToTop, 100));
}

// Initialize website
document.addEventListener("DOMContentLoaded", function () {
  console.log("Triple Treat Toss website initialized");

  // Initialize back to top button
  initBackToTop();

  // Initialize cookie banner
  initCookieBanner();

  // Initialize all modules
  initHeader();
  initFooter();
  initHero();
  initGameSection();
  initFeatures();
  initHowToPlay();
  initField();
  initScreenshots();
  initStatistics();
  initTestimonials();
  initReviews();
  initLegal();

  // Add scroll event listener for animations
  window.addEventListener("scroll", utils.throttle(utils.animateOnScroll, 100));

  // Initial animation check
  utils.animateOnScroll();

  // Update copyright year
  updateCopyright();

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + K to scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Escape to close mobile menu
    if (e.key === "Escape") {
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
        if (mobileMenuBtn) {
          mobileMenuBtn.click();
        }
      }
    }
  });

  // Add smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add intersection observer for lazy loading
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          lazyObserver.unobserve(img);
        }
      }
    });
  }, observerOptions);

  // Observe all images with data-src
  document.querySelectorAll("img[data-src]").forEach((img) => {
    lazyObserver.observe(img);
  });
});

// Update copyright year
function updateCopyright() {
  const copyrightElements = document.querySelectorAll(".copyright-year");
  copyrightElements.forEach((element) => {
    element.textContent = currentYear;
  });
}
