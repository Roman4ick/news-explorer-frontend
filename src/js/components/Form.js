import { MainApi } from '../api/MainApi'
import { Header } from './Header'
import { apiKey,newsURL, baseURL } from '../constants/constants'


class Form {
  constructor(mainApi, header) {
    this.email = ''
    this.password = ''
    this.name = ''
    this.api = mainApi
    this.header = header
  }

  init () {
    this.addEvent()
  }

  addEvent() {
    //открытие формы
    const popupForm = document.querySelector(".popup__form")
    const headerReg = document.querySelector(".header__reg");
    const popup = document.querySelector(".popup");

    headerReg.addEventListener("click", function (event) {
      popup.classList.add('popup_is-opened');
      popupForm.reset()
    })

    //закрытие формы
    const popupClose = document.querySelector(".popup__close");
    popupClose.addEventListener("click", function (event) {
      popup.classList.remove('popup_is-opened');
    })

    const popupInfo = document.querySelector(".popup__info");
    const popupInfoClose = document.querySelector(".popup-info__close");
    const popupInfoBtn = document.querySelector(".popup__content-link_info");
    popupInfoClose.addEventListener("click", function (event) {
      popupInfo.classList.add('hidden')
    })
    popupInfoBtn.addEventListener("click", function (event) {
      popup.classList.remove('popup_is-opened');
      popupInfo.classList.add('hidden')
    })

    //открытие формы входа
    const popupContentLink = document.querySelector(".popup__content-link")
    const popupEntrance = document.querySelector(".popup__entrance")
    popupContentLink.addEventListener("click", function (event) {
      popupEntrance.classList.add('popup_is-opened')
      popup.classList.remove('popup_is-opened')
    });

    const popupEntranceClose = document.querySelector(".popup-entrance__close");
    popupEntranceClose.addEventListener("click", function (event) {
      popupEntrance.classList.remove('popup_is-opened');
    });

    const formEmailBtn = document.querySelector(".popup__content-link_registry");
    formEmailBtn.addEventListener("click", function (e) {
      e.preventDefault()
      popupEntrance.classList.remove('popup_is-opened');
      popup.classList.add('popup_is-opened');
    });
    // const popupButtonAuth = document.querySelector(".popup__button");
    // popupButtonAuth.addEventListener("click", function (e) {
    //   e.preventDefault()
    //   console.log('')
    // });

    const email = popupForm.querySelector('#email')
    const password = popupForm.querySelector('#password')
    const name = popupForm.querySelector('#name')


    popupForm.addEventListener('submit',e=>{
      e.preventDefault()
      console.log('form')
      this.email = email.value
      this.password = password.value
      this.name = name.value

      this.signUpHandler(this.email,this.password,this.name).then(res=>{
        console.log('res',res)
        popupEntrance.classList.add('popup_is-opened');
        popup.classList.remove('popup_is-opened');
      }).catch(err=>console.error('err', err))
    })

    const popupFormEntrance = document.querySelector(".popup__form_entrance");
    const emailEnt = popupFormEntrance.querySelector('#email-ent')
    const passwordEnt = popupFormEntrance.querySelector('#password-ent')
    popupFormEntrance.addEventListener('submit',e=>{
      e.preventDefault()
      this.email = emailEnt.value
      this.password = passwordEnt.value
      this.signInHandler(this.email, this.password).then(res=>{
        console.log(res)
        localStorage.setItem('token', 'Bearer ' + res.token)
        this.header.render()
        popupEntrance.classList.remove('popup_is-opened');
      })
    })

  }

  signUpHandler (email, password, name) {
    return this.api.signUpHandler(email,password,name)
  }

  signInHandler (email, password) {
    return this.api.signInHandler(email,password)
  }

}
export {Form}
