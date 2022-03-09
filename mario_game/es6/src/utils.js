/**
 * elt function - 创建dom元素并赋予class
 *
 * @param  {String} tagName   需创建的标签类型
 * @param  {String} className 需赋予的 class
 * @return {DOM}              创建的 DOM 元素
 */
export const elt = function (tagName, className) {
  const elt = document.createElement(tagName)
  if (className)
    elt.className = className
  return elt
}


/**
 * trackKeys - 构造一个键值事件对象
 *
 * @param  {Object} codes 键值对象
 * @return {Object}       键值事件对象
 */
export const trackKeys = function (codes) {
  let pressed = Object.create(null) // 事件对象
  // 事件处理函数
  function handler(event) {
    if ( codes.hasOwnProperty(event.keyCode) ) {
      let state = (event.type === 'keydown')
      pressed[ codes[event.keyCode] ] = state
      event.preventDefault()
    }
  }
  // 绑定事件
  addEventListener('keydown', handler)
  addEventListener('keyup',   handler)
  // 注销事件
  pressed.unregister = function() {
    removeEventListener('keydown', handler)
    removeEventListener('keyup',   handler)
  }
  return pressed
}


/**
 * runAnimation - requestAnimationFrame的封装
 * requestAnimationFrame 要求跟踪上次调用函数的时间，并在每一帧后再次调用 requestAnimationFrame
 *
 * @param  {type} frameFunc 帧回调
 */
export const runAnimation = function (frameFunc) {
  let lastTime = null
  // time是时间间隔，用于绘制一帧图像，当帧函数返回false时，整个动画停止
  function frame(time) {
    let stop = false
    if (lastTime !== null) {
      // 每帧最大间隔时间为100毫秒
      let timeStep = Math.min(time - lastTime, 100) / 1000
      stop = (frameFunc(timeStep) === false)
    }
    // 页面隐藏时，requestAnimationFrame调用会暂停，lastTime和tim之差为隐藏页面的整个时间
    lastTime = time
    if ( ! stop)
      requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}


/**
 * flipHorizontally - 在指定的 x 坐标处纵向反转一张图片
 *
 * @param  {Canvas getContext} context 画布
 * @param  {Number}            around  反转基点 
 */
export const flipHorizontally = function (context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}
