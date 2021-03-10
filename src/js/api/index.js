// import axios from 'axios'
//
// const baseURL = 'http://www.roman4icknews.students.nomoreparties.space/'
// const newsURL = 'https://newsapi.org/v2/'
// // const newsURL = 'https://nomoreparties.co/news/v2/'
//
// const http = axios.create({
//   baseURL,
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json'
//   }
// })
//
// const httpNews = axios.create({
//   baseURL: newsURL,
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json'
//   }
// })
//
// http.interceptors.request.use(
//   (config) => {
//       config.headers.Authorization = localStorage.getItem('token')
//       return new Promise((resolve, reject) => {
//         resolve(config)
//       })
//   }
// )
//
// httpNews.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = localStorage.getItem('token')
//     return new Promise((resolve, reject) => {
//       resolve(config)
//     })
//   }
// )
//
//
// http.interceptors.response.use(
//   response => {
//     return response
//   },
//   (error) => {
//     return Promise.reject(error.response)
//   }
// )
//
// httpNews.interceptors.response.use(
//   response => {
//     return response
//   },
//   (error) => {
//     return Promise.reject(error.response)
//   }
// )
//
//
// export { http, httpNews }
