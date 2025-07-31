// Utility functions
const utils = {
  // Load JSON data
  loadJSON: async function (url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error loading JSON:", error);
      return null;
    }
  },

  // Throttle function for scroll events
  throttle: function (func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Debounce function for resize events
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Check if element is in viewport
  isInViewport: function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Add animation class when element comes into view
  animateOnScroll: function () {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right"
    );
    elements.forEach((element) => {
      if (utils.isInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  },
};

// Export utils for use in other modules
window.utils = utils;
