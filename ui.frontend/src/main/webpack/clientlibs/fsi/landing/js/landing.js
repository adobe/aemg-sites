// Select all the list items
const listItems = document.querySelectorAll(".bfsi-list-cont .cmp-list .cmp-list__item .cmp-teaser__link");

// Loop through each item and append a button
listItems.forEach(item => {
    // Create a new button element
    const button = document.createElement("button");

    let listTeaserImage = item.querySelector('img');

    // Check if there is no image tag in the item
    if (!listTeaserImage) {
        // If no image, create a new img tag
        listTeaserImage = document.createElement('img');
        listTeaserImage.classList.add("cmp-teaser__image");

        // Optional: Set the image source here
        listTeaserImage.src = "/content/dam/aemguidesDALP/sites-assets/fsi/leave.png";

        // Append the new image to the item
        item.appendChild(listTeaserImage);
    }
    
    if (!listTeaserImage) {
        // If no image, create a new img tag
        listTeaserImage = document.createElement('img');
        listTeaserImage.classList.add("cmp-teaser__image");

        // Optional: Set the image source here
        listTeaserImage.src = "/content/dam/aemguidesDALP/sites-assets/fsi/leave.png";

        // Append the new image to the item
        item.appendChild(listTeaserImage);
    }

    // Set the button's text or attributes
    button.textContent = "Know More";

    // Add a class to style the button
    button.classList.add("cmp-teaser__action-container");

    // Append the button to the list item
    item.appendChild(button);
});
