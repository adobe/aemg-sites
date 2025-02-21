const pdfAbsPath = "/content/dam/fmdita-outputs/pdfs/";

window.addEventListener("DOMContentLoaded", function() {
  const downloadBtn = document.querySelector(".pdf-download .cmp-button");
  downloadBtn.addEventListener("click", function() {
    window.open(getPDFUrl(), "_blank");
  });
});

function getPDFUrl() {
  const topicTitle = document.querySelector("#topic-title .cmp-title__text")?.textContent.split(" ").join("_");
  return pdfAbsPath + topicTitle + ".pdf";
}
