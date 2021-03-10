
export class MainApi {
  constructor(url) {
    this.url = url
  }

  signUpHandler (email, password, name) {
    const options = {
      headers:{
        "Accept": '*',
        "Content-Type": 'application/json'
      },
      method:"POST",
      credentials:"same-origin",
      body:JSON.stringify({
        email:email,
        password:password,
        name:name
      })
    }
    // return http.post('signup',{
    //   email: email,
    //   password: password,
    //   name: name
    // })
    return fetch(`${this.url}signup`,options)
      .then(response=>{
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
  }


  signInHandler(email, password) {
    // return http.post('signin',{
    //   email: email,
    //   password: password
    // })
    const options = {
      headers:{
        "Accept": '*',
        "Content-Type": 'application/json'
      },
      method:"POST",
      credentials:"same-origin",
      body:JSON.stringify({
        email:email,
        password:password
      })
    }

    return fetch(this.url+"signin",options)
      .then(response=>{
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })


  }

  getArticles () {
    // return http.get('articles')
    const options = {
      headers:{
        "Accept": '*',
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem('token')
      },
      method:"GET",
      credentials:"same-origin"
    }
    return fetch(`${this.url}articles`,options)
      .then(response=>{
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
  }


  getUserData () {
    // return http.get('/users/me')
    const options = {
      headers:{
        "Accept": '*',
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem('token')
      },
      method:"GET",
      credentials:"same-origin"
    }
    return fetch(`${this.url}users/me`,options)
      .then(response=>{
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
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
    // return http.post('articles',articlesList)
    const options = {
      headers:{
        "Accept": '*',
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem('token')
      },
      method:"POST",
      credentials:"same-origin",
      body:JSON.stringify(articlesList)
    }
    return fetch(`${this.url}articles`,options)
      .then(response=>{
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
  }


  removeArticles (articles) {
    // return http.delete(`articles/${articles._id}`).then(res=>console.log(res)).catch(err=>console.error(err))
    const options = {
      headers:{
        "Accept": '*',
        "Content-Type": 'application/json',
        Authorization: localStorage.getItem('token')
      },
      method:"DELETE",
      credentials:"same-origin"
    }
    return fetch(`${this.url}articles/${articles._id}`,options).then(response=>{
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
  }
}

