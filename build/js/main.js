let nav = document.querySelector('.header-wrap');
    burger = nav.querySelector('.burger-menu');


nav.classList.remove('header-wrap_nojs');

function burgerClickHandler() {
    nav.classList.toggle('header-wrap_active');
}
burger.addEventListener('click', burgerClickHandler);