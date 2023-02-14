import axios from 'axios'

//Base da url: http://api.themoviedb.org/3/
//Url da api: movie/now_playing?api_key=8002929166c0afe16bb714505b40506d&language=pt-BR

const api = axios.create({
  baseURL: 'http://api.themoviedb.org/3/'
})

export default api
