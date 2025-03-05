window.addEventListener("DOMContentLoaded", function () {
  callafunction();

});

function callafunction() {
  const ulElement = document.querySelectorAll(".singleproplist-ul");

  for (let i = 0; i < ulElement.length; i++) {
    // Retrieve the data-cmp-uniqueprops attribute and parse it as JSON
    const uniquePropsData = JSON.parse(ulElement[i].dataset.cmpUniqueprops);

    // Get the array of strings from the parsed JSON object
    const stringKey = Object.entries(uniquePropsData)[0][0];
    const stringValues = Object.entries(uniquePropsData)[0][1];

    // Create a document fragment to optimize DOM manipulation
    const fragment = document.createDocumentFragment();

    // Loop through each string in the array and create an <li> element
    stringValues.forEach(item => {
      if (stringKey) {
        const li = document.createElement('li');
        li.dataset.filterKey = stringKey;
        li.dataset.value = item;
        li.textContent = item;
        fragment.appendChild(li);
      }
    });

    // Append the fragment containing the <li> elements to the <ul>
    ulElement[i].appendChild(fragment);
  }
}
