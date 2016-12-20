import axios from 'axios'

const handleStatus = (res) => {
  return res.data
}
const handleResponse = (res) => {
  if (res.result === 'success') {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res)
  }
}
export default {
  get (url, params) {
    let queryString = []

    Object.keys(params).forEach(key => params[key] && queryString.push(`${key}=${params[key]}`))
    if (queryString.length > 0) {
      queryString = queryString.join('&')
      url += `?${queryString}`
    }

    return axios
      .get(url)
      .then(handleStatus)
      .then(handleResponse)
      .catch(error => {
        console.log(error)
      })
  },

  post (url, params) {
    return axios
      .post(url, params)
      .then(handleStatus)
      .then(handleResponse)
      .catch(error => {
        console.log(error)
      })
  }
}
