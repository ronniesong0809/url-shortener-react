import axios from 'axios'

export function getUrlStats(shortKey) {
  return axios.get(`${process.env.REACT_APP_BASEURL}/${shortKey}/stats`)
}
