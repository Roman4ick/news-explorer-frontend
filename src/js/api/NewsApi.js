import {daysBefore} from "../utils/utils";

export class NewsApi {

  constructor(key,url) {
    this.url = url
    this.apiKey = key
  }



  getNews (query) {
    // return httpNews.get('top-headlines',{
    //   params: {
    //     query: query,
    //     country: 'us',
    //     apiKey: this.apiKey,
    //     pageSize: 10
    //   }
    // })
    const options = {
      headers:{
        Accept: 'application/json'
      },
      method:"GET",
      credentials:"same-origin"

    }
    const date = new Date().getTime()
    const before = daysBefore(7)
    return fetch(`${this.url}?from=${before}&to=${date}&q=${query}&apiKey=${this.apiKey}&pageSize=10`,options)
        .then(result=>result.json())
  }

}
