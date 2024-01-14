
const searchBtn = document.getElementById('search-btn');
const searchBox = document.querySelector('.header .navbar .search-box');
const form = document.querySelector('.header .search-box form');
const wrapper = document.querySelector('.dishes-area.current .dish-cards');


searchBtn.classList.add('show');

searchBtn.addEventListener('click', (e) => {
    if(location.pathname !== '/dishes'){
        window.location.replace('dishes');
    }else{
        searchBtn.classList.remove('show');
        searchBox.classList.add('show');
    }
})

form.addEventListener('submit', (e) => {

    if(searchBox.classList.contains('show')){
        searchBox.classList.remove('show');
        searchBtn.classList.add('show');
    }

    wrapper.innerHTML = '';
})
