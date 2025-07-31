// Cookie Banner JavaScript functionality

function initCookieBanner() {
  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookieChoice");

  if (cookieChoice) {
    return; // User has already made a choice
  }

  // Create cookie banner
  const cookieBanner = document.createElement("div");
  cookieBanner.className = "cookie-banner";
  cookieBanner.innerHTML = `
    <div class="cookie-banner-content">
      <div class="cookie-text">
        <strong>🍪 We use cookies</strong> to enhance your gaming experience and analyze site traffic. 
        By continuing to use this site, you consent to our use of cookies. 
        <a href="./bug-cookies.html" target="_blank">Learn more</a>
      </div>
      <div class="cookie-buttons">
        <button class="cookie-btn decline" aria-label="Decline cookies">Decline</button>
        <a href="./bug-cookies.html" class="cookie-btn learn-more" aria-label="Learn more about cookies">Learn More</a>
        <button class="cookie-btn accept" aria-label="Accept cookies">Accept All</button>
      </div>
    </div>
  `;

  // Add banner to page
  document.body.appendChild(cookieBanner);

  // Show banner after a short delay
  setTimeout(() => {
    cookieBanner.classList.add("show");
    cookieBanner.classList.add("slide-in");
  }, 1000);

  // Get button elements
  const acceptBtn = cookieBanner.querySelector(".cookie-btn.accept");
  const declineBtn = cookieBanner.querySelector(".cookie-btn.decline");
  const learnMoreBtn = cookieBanner.querySelector(".cookie-btn.learn-more");

  // Handle accept button
  acceptBtn.addEventListener("click", function () {
    acceptCookies();
  });

  // Handle decline button
  declineBtn.addEventListener("click", function () {
    declineCookies();
  });

  // Handle learn more button
  learnMoreBtn.addEventListener("click", function (e) {
    // Let the link work normally, but also hide banner
    setTimeout(() => {
      hideBanner("learn-more");
    }, 100);
  });

  // Handle keyboard navigation
  cookieBanner.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      declineCookies();
    }
  });

  // Function to accept cookies
  function acceptCookies() {
    localStorage.setItem("cookieChoice", "accepted");
    localStorage.setItem("cookieTimestamp", Date.now());

    // Show success state
    cookieBanner.classList.add("success");

    // Hide banner with animation
    hideBanner("accepted");

    // Enable all cookies (in a real app, you'd set actual cookies here)
    console.log("Cookies accepted");
  }

  // Function to decline cookies
  function declineCookies() {
    localStorage.setItem("cookieChoice", "declined");
    localStorage.setItem("cookieTimestamp", Date.now());

    // Hide banner with animation
    hideBanner("declined");

    // Disable non-essential cookies (in a real app, you'd disable cookies here)
    console.log("Cookies declined");
  }

  // Function to hide banner
  function hideBanner(reason) {
    cookieBanner.classList.remove("show");
    cookieBanner.classList.add("slide-out");

    // Remove banner after animation
    setTimeout(() => {
      if (cookieBanner.parentNode) {
        cookieBanner.parentNode.removeChild(cookieBanner);
      }
    }, 500);

    // Log the action
    console.log(`Cookie banner ${reason}`);
  }

  // Add hover effects to buttons
  const buttons = cookieBanner.querySelectorAll(".cookie-btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

    // Add click effect
    button.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.95)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Add intersection observer to show banner when user scrolls to bottom
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && cookieBanner.parentNode) {
          // User scrolled to bottom, ensure banner is visible
          cookieBanner.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe the bottom of the page
  const bottomElement = document.createElement("div");
  bottomElement.style.height = "1px";
  document.body.appendChild(bottomElement);
  observer.observe(bottomElement);

  console.log("Cookie banner initialized");
}

// Function to check if cookies are accepted
function areCookiesAccepted() {
  return localStorage.getItem("cookieChoice") === "accepted";
}

// Function to reset cookie choice (for testing)
function resetCookieChoice() {
  localStorage.removeItem("cookieChoice");
  localStorage.removeItem("cookieTimestamp");
  console.log("Cookie choice reset");
}

// Export functions for use in main.js
window.initCookieBanner = initCookieBanner;
window.areCookiesAccepted = areCookiesAccepted;
window.resetCookieChoice = resetCookieChoice;
