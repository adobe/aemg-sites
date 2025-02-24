window.addEventListener("DOMContentLoaded", function () {
  const tocPopupInit = document.querySelector(".toc-popup-init");

  document.querySelector("body").addEventListener("click", function (e) {

    if (e.target.closest("body:not(.toc-modal) .toc-popup-init")) {
      document.querySelector("body").classList.add("toc-modal");
      return;
    }

    if (!e.target.closest(".cmp-guides-navigation")) {
      document.querySelector("body").classList.remove("toc-modal");
    }
  });

});
