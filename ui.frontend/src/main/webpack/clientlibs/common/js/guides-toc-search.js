import debounce from "../../utils/js/debounce";

let tocJson = null;
let tocFlatArr = null;

function searchInToc(stxt) {
  if (tocFlatArr.length == 0 || tocFlatArr == null || stxt == "") { return [] }
  const searchResults = tocFlatArr.filter(obj => obj.displayName.toLowerCase().includes(stxt.toLowerCase()));
  return searchResults;
}

function processTocJson() {
  const tocArr = [];
  const mainToc = tocJson.children;
  if (mainToc == null || mainToc.length == 0) return;

  mainToc.forEach(extractDisplayNames);

  function extractDisplayNames(obj) {
    if (obj.displayName) {
      const isUniquePath = tocArr.every(item => !item.outputPath.includes(obj.outputPath));

      if (isUniquePath) {
        tocArr.push({ "displayName": obj.displayName, "outputPath": obj.outputPath });
      }
    }
    if (obj.children) {
      obj.children.forEach(child => extractDisplayNames(child));
    }
  }

  return tocArr;
}

function renderSearchResults(container, srchResultCon) {
  const fragment = document.createDocumentFragment();
  container.innerHTML = "";

  srchResultCon.forEach(function (obj) {
    const link = document.createElement('a');
    link.href = obj.outputPath;
    link.textContent = obj.displayName;
    fragment.appendChild(link);
  });

  container.appendChild(fragment);
}

function guidesTOCSearch(searchInput = "toc-search", resultContainer = "toc-search-results") {
  const guidesSearchInput = document.getElementById(searchInput);
  const srchResultCon = document.getElementById(resultContainer);
  tocJson = JSON.parse(document.querySelector('[data-cmp-guides-side-nav-list]')?.dataset.cmpGuidesSideNavList);

  if (tocJson == null || tocJson == "undefined") return;

  guidesSearchInput.addEventListener("input", debounce((e) => {
    if (!tocFlatArr) tocFlatArr = processTocJson();
    const searchResults = searchInToc(e.target.value.trim());

    if (searchResults.length === 0) {
      srchResultCon.style.display = "none";
    } else {
      srchResultCon.style.display = "unset";
    }
    // console.log(searchResults);
    renderSearchResults(srchResultCon, searchResults);
  }, 300));
}

export default guidesTOCSearch;

// left arrow 
var arrowbtnleft = document.querySelector(".arrow-btn-left");
var sidepanel = document.querySelector(".left-container");

if (arrowbtnleft) {
  arrowbtnleft.addEventListener("click", function () {

    let spWidth = sidepanel.offsetWidth;
    let spMarginLeft = parseInt(window.getComputedStyle(sidepanel).marginLeft, 10);
    let w = (spMarginLeft >= 0) ? spWidth * -1 : 0;

    if (w < 0) {
      sidepanel.classList.add('hide-side-panel');
      arrowbtnleft.classList.add('arrow-opposite');
    } else {
      sidepanel.classList.remove('hide-side-panel');
      arrowbtnleft.classList.remove('arrow-opposite');
    }

    sidepanel.style.transition = "margin-left 0.4s ease-in-out";
    sidepanel.style.marginLeft = w + "px";

    // sidepanel.classList.add('hide-side-panel');
  });
}



//right arrow 

var arrowbtnright = document.querySelector(".arrow-btn-right");
var sidepanelRight = document.querySelector(".right-container");

if (arrowbtnright) {
  arrowbtnright.addEventListener("click", function () {
    let spWidth = sidepanelRight.offsetWidth;
    let spMarginRight = parseInt(window.getComputedStyle(sidepanelRight).marginRight, 10);
    let w = (spMarginRight >= 0) ? spWidth * -1 : 0;

    if (w < 0) {
      sidepanelRight.classList.add('hide-side-panel');
    } else {
      sidepanelRight.classList.remove('hide-side-panel');
    }

    // let cw = (w < 0) ? -w : spWidth - 22;

    sidepanelRight.style.transition = "margin-right 0.4s ease-in-out";
    sidepanelRight.style.marginRight = w + "px";
    // sidepanelRight.classList.add('hide-side-panel');  
  });
}





var blog = document.querySelector('.topic-body');
var blogLen = blog.innerText.trim().split(/\s+/).length;
const wpm = 225;
const time = Math.ceil(blogLen / wpm);
document.querySelector('.time-to-read p').textContent = time + ' min read';



