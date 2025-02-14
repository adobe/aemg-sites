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

function guidesTOCSearch(searchInput="toc-search", resultContainer="toc-search-results") {
  const guidesSearchInput = document.getElementById(searchInput);
  const srchResultCon = document.getElementById(resultContainer);
  tocJson = JSON.parse(document.querySelector('[data-cmp-guides-side-nav-list]')?.dataset.cmpGuidesSideNavList);

  if (tocJson == null || tocJson == "undefined") return;

  guidesSearchInput.addEventListener("input", debounce((e) => {
    if (!tocFlatArr) tocFlatArr = processTocJson();
    const searchResults = searchInToc(e.target.value.trim());
    // console.log(searchResults);
    renderSearchResults(srchResultCon, searchResults);
  }, 300));
}

export default guidesTOCSearch;
