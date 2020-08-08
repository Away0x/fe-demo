import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

/**
 * 外部实例化 CancelToken 得到 cancelToken
 * 此时 cancelToken.promise 处于 pending 状态
 * 一旦调用构造函数中传入 executor 的回调，就会执行 resolvePromise,
 * 从而触发 cancelToken.promise.then
 */
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve // resolvePromise 触发就会执行到 promise.then
    })

    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason) // 执行了 promise
    })
  }

  // token 已经被使用过了
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler

    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}
