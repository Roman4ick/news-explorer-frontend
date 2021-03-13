import {convertDate} from "../utils/utils";
export class NewsCardList {
  constructor(mainApi) {
    this.url = window.location.href
    this.api = mainApi
  }

  init () {
    const lastUrl = this.url.split("/")
    const lastUrlName = lastUrl[lastUrl.length - 1].match(/news/)
    if (localStorage.getItem('token') === null && lastUrlName && lastUrlName.length) {
      window.location.href = "/main1.html";
    }
    this.addEvent()
  }

  addEvent () {
    this.getUser()
    this.getCardList()
    this.showMoreBtn()
  }

  getUser () {
    // this.api.getUserData().then(response => {
    //   const { data } = response
    //   console.log('data', data)
    // }).catch(err=>console.error('err', err))
    const user = document.querySelector('.log-header__name')
    user.textContent = localStorage.getItem('userName')
  }

  getCardList() {
    const cardNum = document.querySelector('.log-header__num')
    const newsButtonShow = document.querySelector('.news__button-show');

    this.api.getArticles().then(res=>{
      console.log('res', res)
      this.pasteHtml(res.article)
      if (res.article.length > 3){
        newsButtonShow.classList.remove('hidden')
      }
      cardNum.textContent = res.article.length
      this.keyWordRender(res.article)
    })
  }

  keyWordRender (data) {
    // console.log(this.makeKeysObj(data))
    // const test = [
    //   {
    //     keyword: "Engadget",
    //     value: 2
    //   },
    //   {
    //     keyword: "Engadget1",
    //     value: 1
    //   },
    //   {
    //     keyword: "Engadget3",
    //     value: 3
    //   },
    //   {
    //     keyword: "Engadget4",
    //     value: 4
    //   }
    // ]
    const sortedByValue = this.makeKeysObj(data).sort((a,b)=>this.sortFunc(a,b))
    const keyWordListArr = sortedByValue.map(elem=>elem.keyword)
    let keyWordList = ''
    const keysBlock = document.querySelector('.log-header__keys')
    if(keyWordListArr.length > 3){
      const text = ` и ${keyWordListArr.length - 2} другим`
      keyWordList = keyWordListArr.splice(0, 2).join(', ') + text
      keysBlock.textContent = keyWordList
    } else {
      keyWordList = keyWordListArr.join(', ')
      keysBlock.textContent = keyWordList
    }
  }

  makeKeysObj(target) {
    const result = new Object

    target.forEach(item => result[item.keyword] ? result[item.keyword]++ : result[item.keyword] = 1)

    return Object.keys(result).map(item => {
      return {
        keyword: item,
        value: result[item]
      }
    })
  }

  sortFunc (a, b) {
    if (a.value < b.value) {
      return 1;
    }
    if (a.value > b.value) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  }

  showMoreBtn () {
    //show more btn
    const newsButtonShow = document.querySelector('.news__button-show');
    let count = 3
    newsButtonShow.addEventListener('click', function() {
      count += 3
      const cardsItemHidden = document.querySelectorAll('.cards__item');
      cardsItemHidden.forEach((card, index) => {
        if (index < count) {
          card.classList.remove('cards__item_hidden');
        }
      })
      if (cardsItemHidden.length <= count){
        this.classList.add('hidden');
      }
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
          console.log('rem', res)
          if(!list.length) {
            cards.innerHTML = 'Нет сохраненных статей'
          }
          this.closest('.cards__item').classList.add('cards__item_hidden')
        }).catch(err=>console.error('eee', err))
      })
    })

  }

}
