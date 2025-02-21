// Select all the list items
const listItems = document.querySelectorAll(".bfsi-list-cont .cmp-list .cmp-list__item .cmp-teaser__link");

// Loop through each item and append a button
listItems.forEach(item => {
    // Create a new button element
    const button = document.createElement("button");
    
    // Set the button's text or attributes
    button.textContent = "Know More";
    
    // Optionally, you can add some classes or attributes to style the button
    button.classList.add("cmp-teaser__action-container");

    // Append the button to the list item
    item.appendChild(button);
});
