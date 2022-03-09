import Vector from './../type/Vector'

/**
 * class Coin   硬币
 */
export default class Coin {
  // pos -> 位置坐标 Vector
  constructor(pos) {
    this.pos     = pos.plus(new Vector(0.2, 0.1)) // 当前位置
    this.basePos = pos.plus(new Vector(0.2, 0.1)) // 初始位置
    this.size    = new Vector(0.6, 0.6)
    this.wobble  = Math.random() * Math.PI * 2
    this.type    = 'coin'
  }


  /**
   * act - 运动函数 (硬币会在其位置上轻微上下晃动)
   *
   * @param  {type} step description
   */
  act(step) {
    const wobbleSpeed = 8   // 摇晃速度
    const wobbleDist = 0.07 // 摇晃幅度

    this.wobble += step * wobbleSpeed
    const wobblePos = Math.sin(this.wobble) * wobbleDist
    // 上下轻微摇晃
    this.pos = this.basePos.plus(new Vector(0, wobblePos))
  }
}
