const pdfAbsPath = "/content/dam/fmdita-outputs/pdfs/";

window.addEventListener("DOMContentLoaded", function () {

  const downloadBtn = document.querySelector(".pdf-download .cmp-button");
  const ctaContainer = document.querySelector(".pdf-download");

  downloadBtn.addEventListener("click", function () {
    const pdfUrl = getPDFUrl();
    // Check if the PDF file exists before opening it
    checkPDFExistence(pdfUrl).then(exists => {
      if (exists) {
        window.open(pdfUrl, "_blank");
      } else {
        showNoteMessage(ctaContainer);
      }
    }).catch(error => {
      console.error("Error checking PDF existence:", error);
    });
  });
});

function getPDFUrl() {
  const topicTitle = document.querySelector("#topic-title .cmp-title__text")?.textContent;
  if (!topicTitle) {
    console.error("Topic title not found");
    return "";
  }
  return pdfAbsPath + topicTitle.split(" ").join("_") + ".pdf";
}

function checkPDFExistence(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          resolve(true); // PDF exists
        } else {
          resolve(false); // PDF does not exist
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
function showNoteMessage(container) {

  const noteMessage = document.createElement('div');

  noteMessage.classList.add('pdf-note');
  noteMessage.textContent = "Sorry, the PDF file is not available.";

  if (!container.querySelector('.pdf-note')) {
    container.appendChild(noteMessage);
  }
}
