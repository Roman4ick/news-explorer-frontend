import {httpNews} from "./index";

export class NewsApi {

  constructor(key) {
    this.apiKey = key
  }


  getNews (query) {
    return httpNews.get('top-headlines',{
      params: {
        query: query,
        country: 'us',
        apiKey: this.apiKey,
        pageSize: 10
      }
    })
  }

}
