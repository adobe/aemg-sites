// Get the button element
const bigCursorBtn = document.getElementById('bigcursor-btn');

// Add an event listener to the button
bigCursorBtn.addEventListener('click', function() {
    // Toggle the 'big-cursor-active' class on the <html> element
    document.documentElement.classList.toggle('big-cursor-active');
});
