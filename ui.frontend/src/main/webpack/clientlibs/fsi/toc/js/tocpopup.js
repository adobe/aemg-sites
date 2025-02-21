window.addEventListener("DOMContentLoaded", function () {
  const tocPopupInit = document.querySelector(".toc-popup-init");

  tocPopupInit.addEventListener("click", function () {
    document.querySelector("body").classList.add("toc-modal");

    document.querySelector("body.toc-modal").addEventListener("click", function (e) {

      if (e.target.closest(".toc-popup-init")) return;

      if (!e.target.closest(".cmp-guides-navigation")) {
        document.querySelector("body").classList.remove("toc-modal");
      }
    });
  });
});
