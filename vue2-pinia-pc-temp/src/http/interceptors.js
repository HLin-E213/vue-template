/**
 * 拦截器处理
 * */
import {NEED_LOGIN_STATUS_CODE} from './codeTypes.js'
import debounce from 'lodash-es/debounce'

// 响应拦截器 error 防抖处理
export const errorInterceptors = debounce(function (error) {
  let statusCode = error.response ? error.response.status : undefined
  if (typeof statusCode !== 'undefined' && statusCode === NEED_LOGIN_STATUS_CODE) {
    // 需要重新登录
    setTimeout(() => {
      // Message.error('登录失效，请重新登录')
    }, 400)
    // store.commit('loginOut')
    setTimeout(() => {
      // redirectLogin(true)
    }, 0)
  }
}, 1000, {
  leading: true,
  trailing: false
})
