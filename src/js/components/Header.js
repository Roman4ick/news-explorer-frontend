export class Header {
  constructor() {
    this.userName = ''
    this.status = true
  }

  init() {
    this.addEvent()
    this.render()
  }

  addEvent () {
    const burger = document.querySelector(".burger");
    const headerBurger = document.querySelector(".header__burger");
    headerBurger.addEventListener("click", function (event) {
      burger.classList.add('popup_is-opened');
    });
    const burgerClose = document.querySelector(".burger__close");
    burgerClose.addEventListener("click", function (event) {
      burger.classList.remove('popup_is-opened');
    });

    const logOutBtn = document.querySelector(".header__logout");
    logOutBtn.addEventListener("click",  (event) => {
      localStorage.clear()
      this.render()
    });

    if (localStorage.getItem('token') !== null) {
      const logInBlock = document.querySelector(".header__container")
      logInBlock.classList.remove("hidden");
    }
  }

  checkAuth () {
    const lastUrl = window.location.href.split("/")
    const lastUrlName = lastUrl[lastUrl.length - 1].match(/news/)
    if (localStorage.getItem('token') === null && lastUrlName && lastUrlName.length) {
      window.location.href = "/main.html";
    }
  }

  render () {
    const logInBlock = document.querySelector(".header__container")
    const authorizeBlock = document.querySelector(".header__reg ")
    if (localStorage.getItem('token') !== null) {
      logInBlock.classList.remove("hidden");
      authorizeBlock.classList.add("hidden");
    } else {
      logInBlock.classList.add("hidden");
      authorizeBlock.classList.remove("hidden");
    }
    this.checkAuth()
  }
}
