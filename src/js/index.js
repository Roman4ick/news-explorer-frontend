import '../styles/main.css'
import {Form} from './components/Form'
import {Search} from "./components/Search";
import {Header} from "./components/Header";
import {NewsCard} from "./components/NewsCard";
import {NewsCardList} from "./components/NewsCardList";
import { apiKey,newsURL, baseURL } from './constants/constants'
import {MainApi} from "./api/MainApi";
import {NewsApi} from "./api/NewsApi";


// if page === news
const lastUrl = window.location.href.split("/")
const newsLastUrlName = lastUrl[lastUrl.length - 1].match(/news/)

const mainApi = new MainApi(baseURL)
const newsApi = new NewsApi(apiKey,newsURL)
const header = new Header(mainApi)
header.init()
if (newsLastUrlName === null) {
  const form = new Form(mainApi, header)
  form.init()
  const search = new Search(mainApi, newsApi)
  search.init()
  const newsCard = new NewsCard()
  newsCard.init()
} else {
  const newsCardList = new NewsCardList(mainApi)
  newsCardList.init()
}

// email: "asdasda@asdasd.ru"
// name: "asdaasd"
// password: "asdasdaasdasd"

