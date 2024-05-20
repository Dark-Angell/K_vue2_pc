/**
 * 封装 api 接口请求
 */

import axios from "axios";

const BASE_URL = 'http://jsonplaceholder.typicode.com/'
axios.defaults.timeout = 50000 // 超时默认值
axios.defaults.baseURL = BASE_URL // 默认baseURL
axios.defaults.responseType = 'json' // 默认数据响应类型
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证

axios.interceptors.request.use(
  config => {
    console.log(config)
    return config
  },
  error => {
    return error
  }
)

/**
 * post 方法
 * @param {*} url 
 * @param {*} data 
 */
export function post(url, data = {}) {
  return new Promise((reslove, reject) => {
    axios.post(url, data)
    .then(response => {
      console.log(response)
      reslove(response.data)
    }, err => {
      reject(err)
    })
  })
}

export function get(url, data = {}) {
  return new Promise((reslove, reject) => {
    axios.get(url, data)
    .then(response => {
      console.log(response)
      reslove(response.data)
    }, err => {
      reject(err)
    })
  })
}