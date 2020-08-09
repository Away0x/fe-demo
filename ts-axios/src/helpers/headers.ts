import { Method } from '../types'
import { isPlainObject, deepMerge } from './utils'

/**
 * 因为请求 header 属性是大小写不敏感的，
 * 所以我们先要把一些 header 属性名规范化
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 通过 XMLHttpRequest 对象的 getAllResponseHeaders 方法获取到的值是如下一段字符串
 * date: Fri, 05 Apr 2019 12:40:49 GMT\r\netag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
 *
 * 通过 \r\n 来确定换行的，通过下面方法将其解析为一个对象
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    // 字符串可能存在多个 ":" 的情况
    let [key, ...vals] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) return
    const val = vals.join(':').trim()
    parsed[key] = val
  })
  return parsed
}

// 默认 headers 配置是这样的
// headers: {
//   common: {
//     Accept: 'application/json, text/plain, */*'
//   },
//   post: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// }
// 下面的方法会将配置铺平
// headers: {
//   Accept: 'application/json, text/plain, */*',
//   'Content-Type': 'application/x-www-form-urlencoded'
// }
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
