
const menu = document.querySelector('.header .navbar .menu');
const openBtn = document.querySelector('.header .navbar .menu-icon.open');
const closeBtn = document.querySelector('.header .navbar .menu-icon.close')



openBtn.addEventListener('click', (e) => {
  menu.classList.toggle('show');
})

closeBtn.addEventListener('click', (e) => {
  menu.classList.toggle('show');
})

const link = location.pathname;

document.querySelectorAll(`.header .navbar .menu a`).forEach(item => item.classList.remove('highlight'));

document.querySelector(`.header .navbar .menu a.${link.slice(1)}`).classList.add('highlight');