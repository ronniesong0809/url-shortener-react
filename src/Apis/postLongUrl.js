import axios from 'axios'

export function postLongUrl(data) {
  return axios.post(`${process.env.REACT_APP_BASEURL}/shorten`, {
    url: data.url,
    expiration: data.expiration
  })
}
