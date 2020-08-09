import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()
    // 第三个参数为 async 是否是异步请求
    request.open(method.toUpperCase(), url!, true)

    // 请求配置
    configureRequest()
    // 添加事件函数
    addEvents()
    // 处理 headers
    processHeaders()
    // 处理取消请求的逻辑
    processCancel()
    // 发送请求
    request.send(data)

    function configureRequest(): void {
      if (responseType) request.responseType = responseType
      if (timeout) request.timeout = timeout
      if (withCredentials) request.withCredentials = withCredentials
    }

    function addEvents(): void {
      request.onreadystatechange = () => {
        if (request.readyState !== 4) return
        // 请求发生超时错误 || 网络错误时，status === 0
        if (request.status === 0) return

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())

        // 根据传入的 responseType 来决定返回的数据
        const responseData = responseType === 'text' ? request.responseText : request.response

        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }

        handleResponse(response)
      }

      request.onerror = () => {
        reject(createError(`NetWork Error`, config, null, request))
      }

      request.ontimeout = () => {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      if (onDownloadProgress) request.onprogress = onDownloadProgress
      if (onUploadProgress) request.upload.onprogress = onUploadProgress
    }

    function processHeaders(): void {
      /**
       * 如果请求是个 FormData 类型，则删除 headers['Content-Type']
       * 让浏览器自动为请求带上合适的 Content-Type
       */
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      /**
       * 跨站请求伪造 xsrf 防御
       * 当请求开启了 withCredentials 或者是同源请求时
       * 如果存在 xsrfCookieName 则为请求 headers 带上它的值
       */
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = `Basic ${btoa(`${auth.username} : ${auth.password}`)}`
      }

      Object.keys(headers).forEach(name => {
        // 如果 data 为 null headers 的 content-type 属性没有意义
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise
          .then(reason => {
            request.abort()
            reject(reason)
          })
          .catch(
            /** istanbul ignore next */
            err => {
              console.warn(err)
            }
          )
      }
    }

    function handleResponse(response: AxiosResponse): void {
      const { status } = response
      if (!validateStatus || validateStatus(status)) {
        resolve(response)
      } else {
        reject(
          createError(`Request failed with status code ${status}`, config, null, request, response)
        )
      }
    }
  })
}
