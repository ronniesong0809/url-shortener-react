import axios from 'axios'

export function postLongUrl(url) {
  return axios.post(`${process.env.REACT_APP_BASEURL}/shorten`, {
    url: url
  })
}
