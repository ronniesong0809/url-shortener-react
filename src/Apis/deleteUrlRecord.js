import axios from 'axios'

export function deleteUrlRecord(shortKey) {
  return axios.delete(`${process.env.REACT_APP_BASEURL}/${shortKey}`)
}
