// import debounce from "../../utils/js/debounce";

// let tocJson = null;
// let tocFlatArr = null;

// function searchInToc(stxt) {
//   if (tocFlatArr.length == 0 || tocFlatArr == null || stxt == "") { return [] }
//   const searchResults = tocFlatArr.filter(obj => obj.displayName.toLowerCase().includes(stxt.toLowerCase()));
//   return searchResults;
// }

// function processTocJson() {
//   const tocArr = [];
//   const mainToc = tocJson.children;
//   if (mainToc == null || mainToc.length == 0) return;

//   mainToc.forEach(extractDisplayNames);

//   function extractDisplayNames(obj) {
//     if (obj.displayName) {
//       const isUniquePath = tocArr.every(item => !item.outputPath.includes(obj.outputPath));

//       if (isUniquePath) {
//         tocArr.push({ "displayName": obj.displayName, "outputPath": obj.outputPath });
//       }
//     }
//     if (obj.children) {
//       obj.children.forEach(child => extractDisplayNames(child));
//     }
//   }

//   return tocArr;
// }

// function renderSearchResults(srchResultCon, searchResults) {
//   const fragment = document.createDocumentFragment();
//   srchResultCon.innerHTML = "";
//   if(!searchResults.length) {
//     srchResultCon.innerHTML = "No Results";
//   }

//   searchResults.forEach(function (obj) {
//     const link = document.createElement('a');
//     link.href = obj.outputPath + '.html';
//     link.textContent = obj.displayName;
//     fragment.appendChild(link);
//   });
//   srchResultCon.appendChild(fragment);
// }

// function guidesTOCSearch(searchInput = "toc-search", resultContainer = "toc-search-results") {
//   const guidesSearchInput = document.getElementById(searchInput);
//   const srchResultCon = document.getElementById(resultContainer);
//   tocJson = JSON.parse(document.querySelector('[data-cmp-guides-side-nav-list]')?.dataset.cmpGuidesSideNavList);

//   if (tocJson == null || tocJson == "undefined") return;

//   guidesSearchInput.addEventListener("input", debounce((e) => {
//     if (!tocFlatArr) tocFlatArr = processTocJson();
//     const searchResults = searchInToc(e.target.value.trim());

//     if (searchResults.length) {
//       srchResultCon.style.display = "unset";
//     }
//     // console.log(searchResults);
//     renderSearchResults(srchResultCon, searchResults);
//   }, 300));

//   toggleSearchDropDown(guidesSearchInput, srchResultCon);
// }

// function toggleSearchDropDown(guidesSearchInput, srchResultCon) {
//   document.querySelector("body").addEventListener("click", function (e) {
//     if (
//       (e.target.closest(".toc-search") || e.target.closest(".toc-search-container"))
//       && (guidesSearchInput.value.length)
//     ) {
//       srchResultCon.style.display = "unset";
//       return;
//     }

//     srchResultCon.style.display = "none";
//   });
// }

// export default guidesTOCSearch;



document.addEventListener('DOMContentLoaded', function() {
  const inputField = document.querySelector('.cmp-form-text__text');
  const listItems = document.querySelectorAll('.cmp-guidesnavigation__group li');
  
  inputField.addEventListener('input', function() {
    const searchValue = inputField.value.toLowerCase().trim();
    const searchInputParent = inputField.parentElement;
    if(searchValue) {
     searchInputParent.classList.add("input-active");
    } else {
      searchInputParent.classList.remove("input-active");
    }
      
    listItems.forEach(function(item) {
        const itemText = item.textContent.toLowerCase();
  
        if (itemText.includes(searchValue)) {
            item.style.display = 'list-item';  
        } else {
            item.style.display = 'none';
        }
    });
  });
});
