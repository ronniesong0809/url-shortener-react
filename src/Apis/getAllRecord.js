import axios from 'axios'

export function getAllRecord(url) {
  return axios.get(`${process.env.REACT_APP_BASEURL}/all`)
}
