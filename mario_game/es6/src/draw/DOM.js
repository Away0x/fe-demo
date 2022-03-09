/* 采用 DOM table 方案的绘制方法 */

import { elt } from './../utils'
import * as config from './../config'

/**
 * class DOMDisplay   DOM绘制
 */
export default class DOMDisplay {
  // parent -> dom容器; level -> 地图对象 Level
  constructor(parent, level) {
    this.scale      = config.scale // 比例尺
    this.wrap       = parent.appendChild( elt('div', 'game') ) // 游戏的包装器
    this.level      = level
    this.actorLayer = null

    this.wrap.appendChild( this.drawBackground() )
    // drawFrame需用 actorLayer 属性来跟踪保存活动元素的动作
    this.drawFrame()
  }


  /**
   * drawBackground - 绘制背景
   *
   * @return {DOM}  作为背景的表格 DOM
   */
  drawBackground() {
    const table = elt('table', 'background')

    table.style.width = this.level.width * this.scale + 'px'

    this.level.grid.forEach(row => {
      let rowElt = table.appendChild( elt('tr') ) // 绘制行
      rowElt.style.height = this.scale + 'px'

      row.forEach(type => {
        rowElt.appendChild( elt('td', type) ) // 绘制格子
      })
    })
    return table
  }


  /**
   * drawActors - 绘制活动元素
   *
   * @return {DOM}  活动元素 DOM
   */
  drawActors() {
    const wrap = elt('div') // 所有活动元素的容器

    this.level.actors.forEach(actor => {
      let rect = wrap.appendChild( elt('div', 'actor ' + actor.type) ) // 绘制每个活动元素
      rect.style.width  = actor.size.x * this.scale + 'px'
      rect.style.height = actor.size.y * this.scale + 'px'
      rect.style.left   = actor.pos.x  * this.scale + 'px'
      rect.style.top    = actor.pos.y  * this.scale + 'px'
    })
    return wrap
  }


  /**
   * drawFrame - 每次刷新显示，重绘所有活动元素
   *
   */
  drawFrame() {
    if (this.actorLayer)
      this.wrap.removeChild(this.actorLayer)

    this.actorLayer = this.wrap.appendChild( this.drawActors() ) // 返回被添加的节点
    this.wrap.className = 'game ' + (this.level.status || '')
    this.scrollPlayerIntoView()
  }


  /**
   * scrollPlayerIntoView - 找出玩家位置并更新包装器元素的滚动坐标
   * 通过操纵元素的scrollLeft和scrollTop属性，当玩家接近视口边界时修改滚动坐标
   *
   */
  scrollPlayerIntoView() {
    const width  = this.wrap.clientWidth,
          height = this.wrap.clientHeight,
          margin = width / 3,
          // The viewport
          left   = this.wrap.scrollLeft,
          right  = left + width,
          top    = this.wrap.scrollTop,
          bottom = top + height,
          // 玩家
          player = this.level.player,
          // 玩家中心位置
          // 左上角位置坐标加上其尺寸的一半 = 关卡坐标的中心位置，最后再将结果乘以显示比例
          center = player.pos.plus( player.size.times(0.5) ).times(this.scale)

    if ( center.x < (left + margin) )
      this.wrap.scrollLeft = center.x - margin
    else if ( center.x > (right - margin) )
      this.wrap.scrollLeft = center.x + margin - width

    if ( center.y < (top + margin) )
      this.wrap.scrollTop = center.y - margin
    else if ( center.y > (bottom - margin) )
      this.wrap.scrollTop = center.y + margin - height
  }


  /**
   * clear - 清除显示的关卡，当从新开始和进入下一关时会用到
   *
   */
  clear() {
    this.wrap.parentNode.removeChild(this.wrap)
  }
}
