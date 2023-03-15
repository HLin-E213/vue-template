/**
 * app 接口 request 实例
 * */
import axios from 'axios'
import { errorInterceptors } from './interceptors'
import isNeedStringify from "./isNeedStringify"
import qs from "qs"
import isPlainObject from 'lodash-es/isPlainObject'

const app = axios.create()
app.defaults.timeout = 50000
app.defaults.baseURL = process.env.VUE_APP_BASE_API
app.interceptors.request.use(config => {

  if (isNeedStringify(config)) {
    config.data = qs.stringify(config.data)
  }
  config.headers.Authorization = ''

  return config
}, error => {
  return Promise.reject(error)
})
app.interceptors.response.use(
  response => {
    return response
  },
  error => {
    errorInterceptors(error)
    return Promise.reject(error)
  }
)

export default app

/**
 * GET请求方式
 * @param {*} url
 * @param {*} params
 */
export function get (url, params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    config.params = { ...params, ...config.params }
    app.get(url, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/** 提交JSON数据
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postJSON (url, data = {}, config = {}) {
  return app.post(url, data, config).then(res => {
    return res.data
  }).catch(err => {
    return Promise.reject(err)
  })
}

export const postForm = (url, data, config = {}) => {
  config.headers = isPlainObject(config.headers) ? config.headers : {}
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return app.post(url, data, config).then(res => {
    return res.data
  }).catch(err => {
    return Promise.reject(err)
  })
}
