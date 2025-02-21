
document.querySelector("body").addEventListener("click", function(e) {
  if(!e.target.closest.toc) {
    document.querySelector("body").classList.remove(".toc-modal");
  }
});

const tocPopupInit = document.querySelector(".toc-popup-init");

tocPopupInit.addEventListener("click", function(e) {
  body.classList.add(".toc-modal");
});