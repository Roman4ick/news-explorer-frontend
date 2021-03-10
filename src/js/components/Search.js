import { NewsCard } from './NewsCard'
import { newsURL } from '../constants/constants'
import {convertDate} from '../utils/utils'
export class Search {
  constructor(mainApi, newsApi) {
    this.form = document.querySelector(".search__form")
    this.api = mainApi
    this.newsApi = newsApi
    this.newsCard = new NewsCard()
  }

  init() {
    this.addEventHandler()
  }

  addEventHandler() {
    this.submitHandler()
  }

  checkAuth () {
    return localStorage.getItem('token') !== null;
  }

  submitHandler () {
    const searchInput = document.querySelector(".search__form-input")
    const errorText = document.querySelector(".search__form-error")
    const preloader = document.querySelector(".preloader")
    const newsHidden = document.querySelector('.news_hidden')
    const newsButtonShow = document.querySelector('.news__button-show');
    const newsTitle = document.querySelector('.news-header__title');
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      if (searchInput.value){
        this.newsCard.render()
        preloader.style.display="block"
        //popup error
        this.newsApi.getNews(searchInput.value).then(res=>{
          console.log(res)
          newsHidden.classList.toggle('news_hidden');
          preloader.style.display="none"

          const articles = res.articles
          if (articles && articles.length) {
            this.pasteHtml(articles)
          } else {
            newsTitle.innerHTML = 'Ничего не найдено'
          }

          // const cards =
        })

        errorText.classList.add("hidden");

      } else {
        console.log(searchInput)
        console.log('searchInput 2')
        errorText.classList.remove("hidden");
      }
    })
  }

  pasteHtml (list) {
    const cards = document.querySelector(".cards")
    const that = this
    list.forEach((elem,index)=>{
      let card = document.createElement('div');
      if(index > 2){
        if(this.checkAuth) {
          card.innerHTML= `
      <div class="cards__item cards__item_hidden">
                <div class="cards__image">
                    <div class="cards__image-btn cards__image-btn_active" data-info="${index}"></div>
                    <img class="cards__img" src="${elem.urlToImage}" alt="Лесные огоньки: история одной фотографии">
                </div>
                <div class="cards__content">
                    <time datetime="2021-01-12" class="cards__time">${convertDate(elem.publishedAt)}</time>
                    <h3 class="cards__title">${elem.title}</h3>
                    <p class="cards__paragraph">${elem.description}</p>
                    <p class="cards__source">${elem.author}</p>
                </div>
            </div>
    `
        } else {
          card.innerHTML= `
      <div class="cards__item cards__item_hidden">
                <div class="cards__image">
                    <div class="cards__image-btn cards__image-btn_disabled"></div>
                    <div class="cards__image-info">Войдите, чтобы сохранять статьи</div>
                    <img class="cards__img" src="${elem.urlToImage}" alt="Лесные огоньки: история одной фотографии">
                </div>
                <div class="cards__content">
                    <time datetime="2021-01-12" class="cards__time">${convertDate(elem.publishedAt)}</time>
                    <h3 class="cards__title">${elem.title}</h3>
                    <p class="cards__paragraph">${elem.description}</p>
                    <p class="cards__source">${elem.author}</p>
                </div>
            </div>
    `
        }

      } else {
        if(this.checkAuth) {

          card.innerHTML= `
      <div class="cards__item">
                <div class="cards__image">
                    <div class="cards__image-btn cards__image-btn_active" data-info="${index}"></div>
                    <div class="cards__image-info">Войдите, чтобы сохранять статьи</div>
                    <img class="cards__img" src="${elem.urlToImage}" alt="Лесные огоньки: история одной фотографии">
                </div>
                <div class="cards__content">
                    <time datetime="2021-01-12" class="cards__time">${convertDate(elem.publishedAt)}</time>
                    <h3 class="cards__title">${elem.title}</h3>
                    <p class="cards__paragraph">${elem.description}</p>
                    <p class="cards__source">${elem.author}</p>
                    <p class="cards__keywords" style="display: none">${elem.source.name}</p>
                </div>
            </div>
    `
        } else {

          card.innerHTML= `
      <div class="cards__item">
                <div class="cards__image">
                    <div class="cards__image-btn cards__image-btn_disabled"></div>
                    <div class="cards__image-info">Войдите, чтобы сохранять статьи</div>
                    <img class="cards__img" src="${elem.urlToImage}" alt="Лесные огоньки: история одной фотографии">
                </div>
                <div class="cards__content">
                    <time datetime="2021-01-12" class="cards__time">${convertDate(elem.publishedAt)}</time>
                    <h3 class="cards__title">${elem.title}</h3>
                    <p class="cards__paragraph">${elem.description}</p>
                    <p class="cards__source">${elem.author}</p>
                </div>
            </div>
    `
        }
      }
      cards.append(card)
    })

    const cardsList = document.querySelectorAll(".cards__image-btn_active")
    cardsList.forEach(item=>{
      item.addEventListener('click', function () {
        const indexOfItem = this.dataset.info
        console.log('that.api', that.api)
        console.log('newsURL.api', newsURL)
        that.api.createArticles(list[indexOfItem]).then(res=>{
          console.log(res)
        }).catch(err=>console.error(err))
      })
    })

  }
}
