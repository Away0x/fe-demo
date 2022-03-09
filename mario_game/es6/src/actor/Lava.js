import Vector from './../type/Vector'

/**
 * class Lava   熔岩
 */
export default class Lava {
  // pos -> 位置坐标 Vector; ch -> 类型字符
  constructor(pos, ch) {
    this.pos  = pos
    this.size = new Vector(1, 1)
    this.type = 'lava'

    if (ch === '=')         // 水平方向往返运动的熔岩
      this.speed = new Vector(2, 0)
    else if (ch === '|')    // 垂直方向往返运动的熔岩
      this.speed = new Vector(0, 2)
    else if (ch === 'v')  { // 垂直下落的熔岩
      this.speed = new Vector(0, 3)
      this.repeatPos = pos  // 如无则会往返
    }
  }


  /**
   * act - 运动函数 (熔岩有下落和往返运动两种运动模式)
   *
   * @param  {Number} step  速度向量
   * @param  {Level}  level 游戏地图对象
   */
  act(step, level) {
    const newPos = this.pos.plus(this.speed.times(step))
    // 新位置无障碍物，就移动到新位置上
    if ( ! level.obstacleAt(newPos, this.size))
      this.pos = newPos
    else if (this.repeatPos) // 下落熔岩碰到障碍物，闪回初始位置
      this.pos = this.repeatPos
    else // 速度逆转，确保其开始向另一个方向移动(往返运动)
      this.speed = this.speed.times(-1)
  }
}
