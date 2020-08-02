import { isDate, isPlainObject } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 处理 url
 *
 * 1. 参数值为数组 /base/get?foo[]=bar&foo[]=baz'
 * 2. 参数值为对象 /base/get?foo=%7B%22bar%22:%22baz%22%7D encode 后为 {"bar":"baz"}
 * 3. 参数值为 Date 类型 /base/get?date=2019-04-01T05:55:39.030Z
 * 4. 特殊字符支持
 *    - 对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode
 *    - /base/get?foo=@:$+，注意，我们会把空格 转换成 +
 * 5. 空值忽略 对于值为 null 或者 undefined 的属性，我们是不会添加到 url 参数中的
 * 6. 丢弃 url 中的哈希标记
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
