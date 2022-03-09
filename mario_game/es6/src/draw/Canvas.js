/* 采用 Canvas 方案的绘制方法 */

import { elt, flipHorizontally } from './../utils'
import * as config from './../config'

/**
 * class CanvasDisplay   Canvas绘制
 * 相对于 DOMDisplay ， CanvasDisplay 需使用dom元素的滚动位置，还需追踪自己的viewport
 * viewport会告诉我们目前属于哪个关卡，也会记录时间及当前使用哪一帧的数据
 */
export default class CanvasDisplay {
  // parent -> dom容器; level -> 地图对象 Level
  constructor(parent, level) {
    this.canvas        = parent.appendChild( elt('canvas', 'game') )
    this.canvas.width  = Math.min(600, level.width  * config.scale)
    this.canvas.height = Math.min(450, level.height * config.scale)
    this.cx            = this.canvas.getContext('2d')

    this.level         = level
    this.animationTime = 0 // 计数器,使 drawFrame 可根据当前时间切换动画帧
    // flipPlayer 确保即便玩家站立不动时，它面朝的方向也会和上次移动的方法一致
    this.flipPlayer    = false

    this.viewport = {
      left:   0,
      top:    0,
      width:  this.canvas.width  / config.scale,
      height: this.canvas.height / config.scale
    }
    // 其他 img -> lava coin wall
    this.otherSprites       = elt('img')
    this.otherSprites.src   = require('./img/sprites.png')
    // 玩家img，有各种动作
    this.playerSprites      = elt('img')
    this.playerSprites.src  = require('./img/player.png')

    this.drawFrame(0)
  }


  /**
   * drawFrame - 动画帧,重绘背景和元素，并更新视口
   * 和 dom 的 drawFrame 不同:
   *   - dom 的只画一次背景，并通过滚动dom元素来移动它
   *   - canvas 画布上的图形在绘制后只是像素，无法移动或删除，所以
   *     唯一更新画布的方式是清除并重绘场景
   *
   * @param  {Number} step 步长
   */
  drawFrame(step) {
    this.animationTime += step // 记录时间
    this.updateViewport()      // 更新视口
    this.clearDisplay()        // 清除场景
    this.drawBackground()      // 绘制背景
    this.drawActors()          // 绘制活动元素
  }


  /**
   * updateViewport - description
   *
   */
  updateViewport() {
    let   view   = this.viewport
    const margin = view.width / 3,
          player = this.level.player,
          center = player.pos.plus( player.size.times(0.5) )

    if ( center.x < (view.left + margin) )
      view.left = Math.max(center.x - margin, 0)
    else if ( center.x > (view.left + view.width - margin) )
      view.left = Math.min(center.x + margin - view.width,
                           this.level.width  - view.width)

    if ( center.y < (view.top + margin) )
      view.top = Math.max(center.y - margin, 0)
    else if ( center.y > (view.top + view.height - margin) )
      view.top = Math.min(center.y + margin - view.height,
                          this.level.height - view.height)
  }

  clearDisplay() {
    if (this.level.status === 'won')
      this.cx.fillStyle = 'rgb(68, 191, 255)'
    else if (this.level.status === 'lost')
      this.cx.fillStyle = 'rgb(44, 136, 214)'
    else
      this.cx.fillStyle = 'rgb(52, 166, 251)'

    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawBackground() {
    const view   = this.viewport,
          scale  = config.scale,
          xStart = Math.floor(view.left),
          xEnd   = Math.ceil(view.left + view.width),
          yStart = Math.floor(view.top),
          yEnd   = Math.ceil(view.top + view.height)

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let tile = this.level.grid[y][x]

        if (tile === null) continue

        let screenX = (x - view.left) * config.scale,
            screenY = (y - view.top)  * config.scale,
            tileX   = (tile === 'lava') ? config.scale : 0

        this.cx.drawImage(this.otherSprites,
                          tileX,         0, scale, scale,
                          screenX, screenY, scale, scale)
      }
    }
  }

  drawPlayer(x, y, width, height) {
    let   sprite         = 8
    const player         = this.level.player,
          playerXOverlap = 4

    width += playerXOverlap * 2
    x     -= playerXOverlap

    if (player.speed.x !== 0)
      this.flipPlayer = (player.speed.x < 0)

    if (player.speed.y !== 0)
      sprite = 9
    else if (player.speed.x !== 0)
      sprite = Math.floor(this.animationTime * 12) % 8

    this.cx.save()

    if (this.flipPlayer)
      flipHorizontally( this.cx, x + (width / 2) )

    this.cx.drawImage(this.playerSprites,
                      sprite * width, 0, width, height,
                      x,              y, width, height)
    this.cx.restore()
  }

  drawActors() {
    this.level.actors.forEach(actor => {
      const scale  = config.scale,
            width  = actor.size.x * scale,
            height = actor.size.y * scale,
            x      = (actor.pos.x - this.viewport.left) * scale,
            y      = (actor.pos.y - this.viewport.top)  * scale

      if (actor.type === 'player')
        this.drawPlayer(x, y, width, height)
      else {
        const tileX = ( (actor.type === 'coin') ? 2 : 1 ) * scale
        this.cx.drawImage(this.otherSprites,
                          tileX, 0, width, height,
                          x,     y, width, height)
      }
    })
  }


  /**
   * clear - 清除显示的关卡，当从新开始和进入下一关时会用到
   *
   */
  clear() {
    this.canvas.parentNode.removeChild(this.canvas)
  }
}
