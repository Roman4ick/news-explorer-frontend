import {daysBefore, daysAfter} from "../utils/utils";

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
    const after = daysAfter()
    const before = daysBefore(7)
    return fetch(`${this.url}?from=${before}&to=${after}&q=${query}&apiKey=${this.apiKey}&pageSize=10`,options)
      .then(response=>{
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
  }

}
