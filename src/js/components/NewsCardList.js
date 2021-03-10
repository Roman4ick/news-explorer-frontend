import { MainApi } from '../api/MainApi'
import {convertDate} from "../utils/utils";
import {apiKey} from "../constants/constants";
export class NewsCardList {
  constructor(mainApi) {
    this.url = window.location.href
    this.api = mainApi
  }

  init () {
    const lastUrl = this.url.split("/")
    const lastUrlName = lastUrl[lastUrl.length - 1].match(/news/)
    if (localStorage.getItem('token') === null && lastUrlName && lastUrlName.length) {
      window.location.href = "/main.html";
    }
    this.addEvent()
  }

  addEvent () {
    this.getUser()
    this.getCardList()
  }

  getUser () {
    this.api.getUserData().then(response => {
      const { data } = response
      console.log('data', data)
    }).catch(err=>console.error('err', err))
  }

  getCardList() {
    this.api.getArticles().then(res=>{
      this.pasteHtml(res.article)
    })
  }

  pasteHtml (list) {
    const cards = document.querySelector(".cards")
    const that = this
    list.forEach((elem,index)=>{
      let card = document.createElement('div');
      if(index > 2){
        card.innerHTML= `
      
            <div class="cards__item cards__item_hidden">
                <div class="cards__image">
                    <div class="cards__image-value">${elem.keyword}</div>
                    <div class="cards__image-dell cards__image-dell_active" data-info="${index}"></div>
                    <div class="cards__image-info">Убрать из сохранённых</div>
                    <img class="cards__img" src="${elem.image}" alt="Лесные огоньки: история одной фотографии">
                </div>
                <div class="cards__content">
                    <div class="cards__time">${convertDate(elem.date)}</div>
                    <h3 class="cards__title">${elem.title}</h3>
                    <p class="cards__paragraph">${elem.text}</p>
                    <p class="cards__source">${elem.source}</p>
                </div>
            </div>
    `

      } else {
        card.innerHTML= `
              <div class="cards__item">
                <div class="cards__image">
                    <div class="cards__image-value">${elem.keyword}</div>
                    <div class="cards__image-dell cards__image-dell_active" data-info="${index}"></div>
                    <div class="cards__image-info">Убрать из сохранённых</div>
                    <img class="cards__img" src="${elem.image}" alt="Лесные огоньки: история одной фотографии">
                </div>
                <div class="cards__content">
                    <div class="cards__time">${convertDate(elem.date)}</div>
                    <h3 class="cards__title">${elem.title}</h3>
                    <p class="cards__paragraph">${elem.text}</p>
                    <p class="cards__source">${elem.source}</p>
                </div>
            </div>
        `
      }
      cards.append(card)
    })

    const cardsList = document.querySelectorAll(".cards__image-dell_active")
    cardsList.forEach(item=>{
      item.addEventListener('click', function () {
        const indexOfItem = this.dataset.info
        that.api.removeArticles(list[indexOfItem]).then(res=>{
          if(!list.length) {
            cards.innerHTML = 'Нет сохраненных статей'
          }
          this.closest('.cards__item').classList.add('cards__item_hidden')
        }).catch(err=>console.error(err))
      })
    })

  }

}
