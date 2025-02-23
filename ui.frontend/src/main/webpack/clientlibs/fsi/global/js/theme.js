window.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const themeBtn = document.querySelector(".theme-btn");
  themeBtn.addEventListener("click", function () {

    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Dark
        body.classList.toggle("light");
      } else {
        // Light
        body.classList.toggle("dark");
      }
    }

  })
});