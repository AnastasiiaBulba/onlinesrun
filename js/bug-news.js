// Bug News Page functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Bug News page initialized");

  // Initialize header and footer
  if (typeof initHeader === "function") {
    initHeader();
  }

  if (typeof initFooter === "function") {
    initFooter();
  }

  // Load news data
  loadNewsData();

  // Update copyright year
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll(".copyright-year");
  copyrightElements.forEach((element) => {
    element.textContent = currentYear;
  });

  // Add smooth scrolling for internal links
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
});

// Load news data from JSON
async function loadNewsData() {
  try {
    const response = await fetch("./data/news.json");
    const data = await response.json();

    const newsContainer = document.getElementById("news-container");
    if (!newsContainer) return;

    // Combine game updates and trail diaries
    const allNews = [...data.gameUpdates, ...data.trailDiaries];

    // Sort by date (newest first)
    allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create news items
    allNews.forEach((news, index) => {
      const newsItem = createNewsItem(news, index);
      newsContainer.appendChild(newsItem);
    });

    // Add hover effects to news items
    const newsItems = document.querySelectorAll(".news-item");
    newsItems.forEach((item, index) => {
      // Add staggered animation delay
      item.style.animationDelay = `${index * 0.1}s`;

      // Add hover effects
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
  } catch (error) {
    console.error("Error loading news data:", error);
  }
}

// Create news item HTML
function createNewsItem(news, index) {
  const newsItem = document.createElement("div");
  newsItem.className = "news-item fade-in";
  newsItem.dataset.id = news.id;

  const date = new Date(news.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  newsItem.innerHTML = `
    <div class="news-image">
      <img src="${news.image}" alt="${news.title}" loading="lazy">
    </div>
    <div class="news-content-inner">
      <span class="news-date">${formattedDate}</span>
      <h3 class="news-title">${news.title}</h3>
      <p class="news-excerpt">${news.excerpt}</p>
      <div class="news-full-text">${news.fullText}</div>
      <button class="read-more-btn" onclick="toggleReadMore(${news.id})">
        Read more
      </button>
    </div>
  `;

  return newsItem;
}

// Toggle read more functionality
function toggleReadMore(id) {
  const newsItem = document.querySelector(`[data-id="${id}"]`);
  if (!newsItem) return;

  const excerpt = newsItem.querySelector(".news-excerpt");
  const fullText = newsItem.querySelector(".news-full-text");
  const button = newsItem.querySelector(".read-more-btn");

  if (newsItem.classList.contains("expanded")) {
    // Hide full text
    newsItem.classList.remove("expanded");
    excerpt.style.display = "block";
    button.textContent = "Read more";
    button.classList.remove("expanded");
  } else {
    // Show full text
    newsItem.classList.add("expanded");
    excerpt.style.display = "none";
    button.textContent = "Read less";
    button.classList.add("expanded");
  }
}
