import '../styles/main.css'

const newsButtonShow = document.querySelector('.news__button-show');
const cardsItemHidden = document.querySelectorAll('.cards__item_hidden');
newsButtonShow.addEventListener('click', function() {
    cardsItemHidden.forEach((card) => {
        card.classList.toggle('cards__item_hidden');
    })
});
const searchFormButton = document.querySelector('.search__form-button');
const preloader = document.querySelector(".preloader")
const newsHidden = document.querySelector('.news_hidden');
searchFormButton.addEventListener('click', function (e) {
    preloader.style.display="block"
    e.preventDefault();
    setTimeout(function () {
        newsHidden.classList.toggle('news_hidden');
        preloader.style.display="none"
    }, 2000); 
});
//открытие формы
const popupForm = document.querySelector(".popup__form")
const headerReg = document.querySelector(".header__reg");
const popup = document.querySelector(".popup");
headerReg.addEventListener("click", function (event) {
    popup.classList.add('popup_is-opened');
    popupForm.reset()
});
//закрытие формы
const popupClose = document.querySelector(".popup__close");
popupClose.addEventListener("click", function (event) {
    popup.classList.remove('popup_is-opened');
});
//открытие формы входа
const popupContentLink = document.querySelector(".popup__content-link");
const popupEntrance = document.querySelector(".popup__entrance")
popupContentLink.addEventListener("click", function (event) {
    popupEntrance.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-opened');
});
const popupEntranceClose = document.querySelector(".popup-entrance__close");
popupEntranceClose.addEventListener("click", function (event) {
    popupEntrance.classList.remove('popup_is-opened');
});
const burger = document.querySelector(".burger");
const headerBurger = document.querySelector(".header__burger");
headerBurger.addEventListener("click", function (event) {
    burger.classList.add('popup_is-opened');
});
const burgerClose = document.querySelector(".burger__close");
burgerClose.addEventListener("click", function (event) {
    burger.classList.remove('popup_is-opened');
});