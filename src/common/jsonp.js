import Jsonp from 'jsonp'

/**
 * 封装jsonp函数
 * @param url  请求url
 * @param data  请求的参数
 * @param option  jsonp配置选项
 * @constructor
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('？') < 0 ? '?' : '') + jointParams(data)
  return new Promise((resolve, reject) => {
    Jsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 将参数拼接成url的参数
 * @param data  请求参数对象
 */
function jointParams (data) {
  let url = ''
  for (let key in data) {
    let value = data[key] === undefined ? '' : data[key]
    url += '&' + key + '=' + encodeURI(value)
  }
  return url ? url.substring(1) : ''
}
