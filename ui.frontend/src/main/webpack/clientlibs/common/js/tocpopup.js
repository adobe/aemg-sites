window.addEventListener("DOMContentLoaded", function () {
  const tocPopupInit = document.querySelector(".toc-popup-init");

  document.querySelector("body").addEventListener("click", function (e) {

    if (e.target.closest("body:not(.toc-modal) .toc-popup-init")) {
      document.querySelector("body").classList.add("toc-modal");
      document.querySelector(".toc-search").style.display = "block"; 
      return;
    }

    if (!e.target.closest(".cmp-guides-navigation") && getComputedStyle(document.querySelector('.toc-popup-init')).display === "inline-block") {
      document.querySelector("body").classList.remove("toc-modal");
      document.querySelector(".toc-search").style.display = "none"; 
    }
  });

  document.querySelector(".toc-search input").addEventListener('click', function (e) {
    e.stopPropagation(); 
  });

});
