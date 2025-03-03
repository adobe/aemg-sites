// Define the static JSON list (Fallback Data)
let staticJsonList = [
  {
    "navtitle": "Test",
    "dc:description":
      "This document outlines the criteria, management, and reporting standards for issuing green bonds. It aligns with ICMA Green Bond Principles to ensure transparency and impact-driven financing.",
    "dc:image":
      "/content/dam/aemguidesDALP/sites-assets/hi-tech/headphonelist.png",
    "path": "/content/aemguidesDALP/us/en/hi-tech-landing-page/test.html"
  },
  {
    "navtitle": "Eligible Categories",
    "dc:description":
      "This document outlines the criteria, management, and reporting standards for issuing green bonds. It aligns with ICMA Green Bond Principles to ensure transparency and impact-driven financing.",
    "dc:image":
      "/content/dam/aemguidesDALP/sites-assets/hi-tech/headphonelist.png",
    "path": "/content/aemguidesDALP/us/en/hi-tech-landing-page/eligible-categories.html"
  },
  {
    "navtitle": "USB 2.0 Tuning Guide",
    "dc:description":
      "This document outlines the criteria, management, and reporting standards for issuing green bonds. It aligns with ICMA Green Bond Principles to ensure transparency and impact-driven financing.",
    "dc:image":
      "/content/dam/aemguidesDALP/sites-assets/hi-tech/headphonelist.png",
    "path": "/content/aemguidesDALP/us/en/hi-tech-landing-page/hi-tech-system-highligh-0.html"
  },
  {
    "navtitle": "Advance Technology Comparison",
    "dc:description":
      "This document outlines the criteria, management, and reporting standards for issuing green bonds. It aligns with ICMA Green Bond Principles to ensure transparency and impact-driven financing.",
    "dc:image":
      "/content/dam/aemguidesDALP/sites-assets/hi-tech/headphonelist.png",
    "path": "/content/aemguidesDALP/us/en/hi-tech-landing-page/advance-technology-camprison.html"
  },
  {
    "navtitle": "Multiple Column View",
    "dc:description":
      "This document outlines the criteria, management, and reporting standards for issuing green bonds. It aligns with ICMA Green Bond Principles to ensure transparency and impact-driven financing.",
    "dc:image":
      "/content/dam/aemguidesDALP/sites-assets/hi-tech/headphonelist.png",
    "path": "/content/aemguidesDALP/us/en/hi-tech-landing-page/multiple-column-view.html"
  },
  {
    "navtitle":
      "Advanced Technologies in Semiconductor and Aviation Industries",
    "dc:description":
      "This document outlines the criteria, management, and reporting standards for issuing green bonds. It aligns with ICMA Green Bond Principles to ensure transparency and impact-driven financing.",
    "dc:image":
      "/content/dam/aemguidesDALP/sites-assets/hi-tech/headphonelist.png",
    "path": "/content/aemguidesDALP/us/en/hi-tech-landing-page/semiconductor.html"
  },
];


// Step 2: Populate the navigation with the fetched data
function populateNavigation(data) {
  // Select the element where we want to populate the JSON data
  const container = document.querySelector(".cmp-guides-navigation");

  // Clear existing content if any
  container.innerHTML = "";

  // Loop through the data and create HTML elements
  data.forEach((item) => {
    container.classList.add('.toc-list-meta')
    const title = item["navtitle"];
    const description = item["dc:description"];
    const image = item["dc:image"];

    // Create the structure for each item
    const guideItem = document.createElement("div");
    guideItem.classList.add("guide-item");

    guideItem.innerHTML = `
      <a href="${item.path}">
      <img src="${image}" alt="${title}">
      <h3>${title}</h3>
      <p>${description}</p>
      </a>
    `;

    // Append each item to the container
    container.appendChild(guideItem);
  });
}

// Call the function to populate the data
populateNavigation(staticJsonList);
