import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: `https://mijn-inzet.herokuapp.com`,
  headers: {
    'Access-Control-Allow-Origin': 'https://oege.ie.hva.nl/~zhengk001'
  }
})