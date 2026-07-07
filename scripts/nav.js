const navBtn = document.querySelector('#ham-btn');
const navMenu = document.querySelector('#nav')

navBtn.addEventListener('click', () => {
  navBtn.classList.toggle('show');
  navMenu.classList.toggle('show');
});