const newsButtonShow = document.querySelector('.news__button-show');
const cardsItemHidden = document.querySelectorAll('.cards__item_hidden');
newsButtonShow.addEventListener('click', function() {
    cardsItemHidden.forEach((card) => {
        card.classList.toggle('cards__item_hidden');
    })
});

const searchFormButton = document.querySelector('.search__form__button');
const newsHidden = document.querySelector('.news_hidden');
searchFormButton.addEventListener('click', function(e) {
    e.preventDefault();
    newsHidden.classList.toggle('news_hidden');
});