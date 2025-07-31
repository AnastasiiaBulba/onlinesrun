// Legal Pages JavaScript functionality for Whack A Bug

function initLegal() {
  // Initialize header and footer for legal pages
  initHeader();
  initFooter();
  initCookieBanner();

  const legalText = document.querySelector(".legal-text");

  if (!legalText) return;

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const legalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  legalObserver.observe(legalText);

  // Add hover effects to headings
  const headings = legalText.querySelectorAll("h2");
  headings.forEach((heading) => {
    heading.addEventListener("mouseenter", function () {
      this.style.color = "var(--primary-color)";
      this.style.transform = "translateX(5px)";
    });

    heading.addEventListener("mouseleave", function () {
      this.style.color = "var(--primary-color)";
      this.style.transform = "translateX(0)";
    });
  });

  // Add click effects to paragraphs
  const paragraphs = legalText.querySelectorAll("p");
  paragraphs.forEach((paragraph) => {
    paragraph.addEventListener("click", function () {
      this.style.background = "rgba(74, 222, 128, 0.1)";
      setTimeout(() => {
        this.style.background = "transparent";
      }, 300);
    });
  });

  // Add keyboard navigation
  legalText.setAttribute("tabindex", "0");
  legalText.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Scroll to next section
      const nextHeading = this.querySelector("h2");
      if (nextHeading) {
        nextHeading.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Add smooth scrolling for anchor links
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

  // Add print functionality
  const printBtn = document.createElement("button");
  printBtn.textContent = "Print Page";
  printBtn.className = "print-btn";
  printBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        z-index: 1000;
        font-weight: 600;
        transition: var(--transition-fast);
    `;

  printBtn.addEventListener("click", () => {
    window.print();
  });

  printBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
    this.style.boxShadow = "var(--shadow-md)";
  });

  printBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "none";
  });

  document.body.appendChild(printBtn);

  // Add table of contents functionality (if needed)
  const headingsList = Array.from(headings).map((heading) => ({
    text: heading.textContent,
    id: heading.textContent.toLowerCase().replace(/\s+/g, "-"),
  }));

  if (headingsList.length > 3) {
    // Create table of contents
    const toc = document.createElement("div");
    toc.className = "toc";
    toc.innerHTML = `
            <h3>Table of Contents</h3>
            <ul>
                ${headingsList
                  .map(
                    (item) => `
                    <li><a href="#${item.id}">${item.text}</a></li>
                `
                  )
                  .join("")}
            </ul>
        `;

    // Insert TOC before legal text
    legalText.parentNode.insertBefore(toc, legalText);

    // Add IDs to headings
    headings.forEach((heading, index) => {
      heading.id = headingsList[index].id;
    });
  }

  // Add reading progress indicator
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        z-index: 1001;
        transition: width 0.3s ease;
    `;

  document.body.appendChild(progressBar);

  // Update progress bar on scroll
  window.addEventListener(
    "scroll",
    utils.throttle(() => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    }, 100)
  );

  // Add back to top button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.textContent = "↑";
  backToTopBtn.className = "back-to-top-btn";
  backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: var(--secondary-color);
        color: var(--background-color);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        font-size: 1.5rem;
        font-weight: bold;
        transition: var(--transition-fast);
        opacity: 0;
        visibility: hidden;
    `;

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  backToTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.boxShadow = "var(--shadow-md)";
  });

  backToTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "none";
  });

  document.body.appendChild(backToTopBtn);

  // Show/hide back to top button
  window.addEventListener(
    "scroll",
    utils.throttle(() => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.visibility = "visible";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.visibility = "hidden";
      }
    }, 100)
  );

  console.log("Bug Legal page initialized");
}

// Export function for use in main.js
window.initLegal = initLegal;
