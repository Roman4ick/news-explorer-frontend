import { http } from './index'

export class MainApi {
  constructor() {
  }

  signUpHandler (email, password, name) {
    return http.post('signup',{
      email: email,
      password: password,
      name: name
    })
  }

  signInHandler(email, password) {
    return http.post('signin',{
      email: email,
      password: password
    })
  }

  getArticles () {
    return http.get('articles')
  }


  getUserData () {
    return http.get('/users/me')
  }

  createArticles (articles) {
    const articlesList = {
      keyword: articles.source.name,
      title: articles.title,
      text: articles.description,
      date: articles.publishedAt,
      source: articles.author,
      link: articles.url,
      image: articles.urlToImage
    }
    return http.post('articles',articlesList)
  }

  removeArticles (articles) {
    return http.delete(`articles/${articles._id}`).then(res=>console.log(res)).catch(err=>console.error(err))
  }
}

