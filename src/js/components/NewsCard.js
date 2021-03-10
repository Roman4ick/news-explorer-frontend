import {convertDate} from '../utils/utils'
export class NewsCard {
  constructor() {
    this.url = window.location.href
  }

  init () {
    this.addEvent()
    const lastUrl = this.url.split("/")
    const lastUrlName = lastUrl[lastUrl.length - 1].match(/news/)
    if (localStorage.getItem('token') === null && lastUrlName && lastUrlName.length) {
      window.location.href = "/main.html";
    }
  }

  addEvent () {
    //show more btn
    const newsButtonShow = document.querySelector('.news__button-show');
    newsButtonShow.addEventListener('click', function() {
      const cardsItemHidden = document.querySelectorAll('.cards__item');
      cardsItemHidden.forEach((card) => {
        card.classList.remove('cards__item_hidden');
      })
      this.classList.add('hidden');
    })
  }

  render () {
    const cardBtnList = document.querySelectorAll('.cards__image-btn');
    // convertDate()
    if (localStorage.getItem('token') !== null) {
      cardBtnList.forEach(elem=>{
        elem.classList.remove("cards__image-btn_disabled");
      })
    } else {
      cardBtnList.forEach(elem=>{
        elem.classList.add("cards__image-btn_disabled");
      })
    }
  }


}
