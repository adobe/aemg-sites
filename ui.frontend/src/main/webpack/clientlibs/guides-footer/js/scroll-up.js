//go to top functionality
let gototop = document.querySelector('.gototop_arrow');

gototop.addEventListener('click', ()=> {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
})