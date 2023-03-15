import isPlainObject from 'lodash-es/isPlainObject'

/**
 * 是否需要qs.stringify
 * */
export default function (config) {
  let contentType = config.headers['content-type'] || config.headers['Content-Type']
  return contentType && contentType.includes('application/x-www-form-urlencoded') && isPlainObject(config.data)
}
