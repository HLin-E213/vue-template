import cookies from 'js-cookie'
// 创建cookies （名字，值，时间）  时间单位为天
 function cookieSet(cName, value, expiredays) {
  if (process.env.NODE_ENV === 'development') {
    cookies.set(cName, value, { expires: expiredays })
  } else {
    cookies.set(cName, value, {
      expires: expiredays,
      path: '/',
      domain: process.env.VUE_APP_COOKIE
    })
  }
}

function cookieRead(key, getAll = false) {
  return getAll ? cookies.get() : cookies.get(key)
}

 function cookieClear(key) {
  if (process.env.NODE_ENV === 'development') {
    cookies.remove(key)
  } else {
    cookies.remove(key,
      { path: '/', domain: process.env.VUE_APP_COOKIE }
      )
  }
}
const cookie = {
  cookieSet,
  cookieRead,
  cookieClear
}
export default cookie
