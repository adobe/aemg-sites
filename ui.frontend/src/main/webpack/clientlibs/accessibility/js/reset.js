window.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.getElementById("accessibility-reset");
  const magnifier = document.getElementById("magnifier");

  resetButton.addEventListener("click", function () {
    document.body.classList.remove("accessibility-highlight",
      "accessibility-text-spacing",
      "accessibility-line-height",
      "big-cursor-active");

    document.body.style.filter = "initial";
    document.documentElement.style.fontSize = "initial";
    magnifier.click();
    
  });

});
