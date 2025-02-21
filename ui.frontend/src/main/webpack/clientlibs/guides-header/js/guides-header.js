let hamburger = document.querySelector(".hamburger_icon");
let header = document.querySelector(".fsi-header-wrapper");

hamburger.addEventListener('click', ()=> {
    header.classList.toggle('mob-navigation');
});
