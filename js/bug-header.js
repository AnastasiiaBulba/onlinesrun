// Header JavaScript functionality

function initHeader() {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  // Create header HTML
  const headerHTML = `
        <header class="header fade-in">
            <div class="header-container">
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a href="./" class="nav-link">Home</a></li>
                        <li><a href="./bug-news.html" class="nav-link">Updates</a></li>
                        <li><a href="./bug-contacts.html" class="nav-link">Support</a></li>
                        <li><a href="./bug-disclaimer.html" class="nav-link">Disclaimer</a></li>
                    </ul>
                </nav>
                
                <a href="./" class="logo">
                    <div class="logo-icon">🐛</div>
                    <span>Onlinesrun.com</span>
                </a>

                <button class="mobile-menu-btn" id="mobile-menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>

        <div class="mobile-menu-overlay" id="mobile-menu-overlay">
            <div class="mobile-menu">
                <ul class="mobile-menu-list">
                    <li><a href="./" class="mobile-menu-link">Home</a></li>
                    <li><a href="./bug-news.html" class="mobile-menu-link">Updates</a></li>
                    <li><a href="./bug-contacts.html" class="mobile-menu-link">Support</a></li>
                    <li><a href="./bug-disclaimer.html" class="mobile-menu-link">Disclaimer</a></li>
                </ul>
            </div>
        </div>
    `;

  headerContainer.innerHTML = headerHTML;

  // Get elements
  const header = document.querySelector(".header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

  // Mobile menu functionality
  function toggleMobileMenu() {
    const isActive = mobileMenuBtn.classList.contains("active");

    if (isActive) {
      // Close menu
      mobileMenuBtn.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    } else {
      // Open menu
      mobileMenuBtn.classList.add("active");
      mobileMenuOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // Close mobile menu when clicking on a link
  function closeMobileMenu() {
    mobileMenuBtn.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event listeners for mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Close menu when clicking on overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", function (e) {
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  // Close menu when clicking on mobile menu links
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Header scroll effect
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // Event listeners
  window.addEventListener("scroll", utils.throttle(handleHeaderScroll, 100));

  // Add hover effects to nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });

  // Smooth scroll for anchor links
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

  // Add loading animation
  setTimeout(() => {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }, 100);
}

// Export function for use in main.js
window.initHeader = initHeader;
