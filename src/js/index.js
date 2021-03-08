import '../styles/main.css'
import {Form} from './components/Form'
import {Search} from "./components/Search";
import {Header} from "./components/Header";
import {NewsCard} from "./components/NewsCard";
import {NewsCardList} from "./components/NewsCardList";


// if page === news
const lastUrl = window.location.href.split("/")
const newsLastUrlName = lastUrl[lastUrl.length - 1].match(/news/)

if (newsLastUrlName === null) {
  const header = new Header()
  header.init()
  const form = new Form()
  form.init()
  const search = new Search()
  search.init()
  const newsCard = new NewsCard()
  newsCard.init()
} else {
  const newsCardList = new NewsCardList()
  newsCardList.init()
}


