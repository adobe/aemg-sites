window.addEventListener("DOMContentLoaded", function () {
  const filterElements = document.querySelectorAll("[data-filter-key]");
  const elements = document.querySelectorAll(".leveloneprops div .guide-item");

  filterElements.forEach(li => {
    li.addEventListener("click", () => {

      activeFilterClassToggle(li);

      const filterKey = li.dataset.filterKey;
      const filterVal = li.dataset.value;

      const activeProductCat = document.querySelector(".vehicleproductcategory .active-filter");
      const activeVehType = document.querySelector(".vehicletype .active-filter");
      const activeModel = document.querySelector(".vehiclemodel  .active-filter");

      elements.forEach(ele => {
        if (filterKey.toLowerCase() == "all") {
          ele.style.display = "block";
        }

        else if (activeModel && activeVehType) {

          const activeProductCatKey = activeProductCat.dataset.filterKey;
          const activeProductCatVal = activeProductCat.dataset.value;

          const activeVehTypeKey = activeVehType.dataset.filterKey;
          const activeVehTypeVal = activeVehType.dataset.value;

          const activeModelKey = activeModel.dataset.filterKey;
          const activeModelVal = activeModel.dataset.value;

          if (ele.dataset[activeVehTypeKey] == activeVehTypeVal &&
            ele.dataset[activeModelKey] == activeModelVal &&
            (activeProductCatVal ? (ele.dataset[activeProductCatKey] == activeProductCatVal) : true)
          ) {
            ele.style.display = "block";
          } else {
            ele.style.display = "none";
          }
        }

        else {
          if (ele.dataset[filterKey] == filterVal) {
            ele.style.display = "block";
          } else {
            ele.style.display = "none";
          }
        }

      })
    })
  });
});

function activeFilterClassToggle(li) {
  const parentUl = li.closest("ul");
  const prevActiveLi = parentUl.querySelector(".active-filter");
  if(prevActiveLi) {
    prevActiveLi.classList.remove("active-filter");
  }

  li.classList.add("active-filter");
}
