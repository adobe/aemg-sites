document.addEventListener("DOMContentLoaded", function () {

    const likeButton = document.querySelector(".like-button");
    const dislikeButton = document.querySelector(".dislike-button");
    const feedbackContainer = document.querySelector(".feedback-container");

    function handleFeedback(type) {
        // Highlight selected button
        if (type === "like") {
            likeButton.classList.add("selected");
        } else {
            dislikeButton.classList.add("selected");
        }

        // Disable both buttons
        likeButton.disabled = true;
        dislikeButton.disabled = true;

        // Show confirmation message
        const message = document.createElement("p");
        message.classList.add("feedback-message");
        message.innerText = "Thanks for your feedback!";
        feedbackContainer.appendChild(message);

        setTimeout(() => {
            message.style.opacity = "1";
            message.style.transform = "translateY(0)";
        }, 100);
    }

    likeButton.addEventListener("click", () => handleFeedback("like"));
    dislikeButton.addEventListener("click", () => handleFeedback("dislike"));
    
});
