let hamburger = document.querySelector(".hamburger_icon");
let header = document.querySelector(".fsi-header-wrapper");

hamburger.addEventListener('click', ()=> {
    header.classList.toggle('mob-navigation');
});

document.querySelector('.global-search').addEventListener('click', ()=> {
    document.querySelector('.search-container').classList.remove('display-none');
});
document.querySelector('.cmp-search-bar__clear-icon').addEventListener('click', ()=> {
    document.querySelector('.search-container').classList.add('display-none');
});
