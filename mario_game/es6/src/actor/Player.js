import Vector from './../type/Vector'

/**
 * class Player   玩家 (玩家碰到不同的物体，会有不同的响应)
 */
export default class Player {
  // pos -> 位置坐标 Vector
  constructor(pos) {
    this.pos   = pos.plus(new Vector(0, -0.5)) // 玩家高度是半个格子
    this.size  = new Vector(0.8, 1.5)
    this.speed = new Vector(0, 0)              // 当前速度
    this.type  = 'player'
  }


  /**
   * moveX - 玩家水平运动
   *
   * @param  {Number} step  速度向量
   * @param  {Level}  level 游戏地图对象
   * @param  {Object} keys  按键键值对象
   */
  moveX(step, level, keys) {
    const playerXSpeed = 7 // 玩家 x 方向移动速度
    let motion, newPos, obstacle
    this.speed.x = 0

    /* 1.玩家的运动方向 */
    if (keys.left) // 按左键时
      this.speed.x -= playerXSpeed
    if (keys.right)
      this.speed.x += playerXSpeed

    /* 2.移动 */
    motion = new Vector(this.speed.x * step, 0) // 移动距离
    newPos = this.pos.plus(motion)              // 移动后的新位置

    /* 3.对于玩家碰到物体时的判断 */
    obstacle = level.obstacleAt(newPos, this.size) // 移动位置上是否有障碍物
    if (obstacle)
      level.playerTouched(obstacle) // 如碰到的是熔岩，游戏结束
    else // 没碰到物体，更新位置
      this.pos = newPos
  }


  /**
   * moveY - 玩家垂直运动 （相对于水平运动，需处理重力和跳跃运动）
   *
   * @param  {Number} step  速度向量
   * @param  {Level}  level 游戏地图对象
   * @param  {Object} keys  按键键值对象
   */
  moveY(step, level, keys) {
    const gravity   = 30  // 重力参数
    const jumpSpeed = 17  // 跳跃速度
    let motion, newPos, obstacle
    this.speed.y += step * gravity

    /* 1. 移动 */
    motion = new Vector(0, this.speed.y * step) // 移动距离
    newPos = this.pos.plus(motion)              // 移动后的新位置

    /* 2.对于玩家碰到物体时的判断 */
    obstacle = level.obstacleAt(newPos, this.size) // 移动位置上是否有障碍物
    if (obstacle) {
      // 如碰到的是熔岩，游戏结束
      level.playerTouched(obstacle)
      if ( keys.up && (this.speed.y > 0) ) // 跳跃及高度大于0时，会下落
        this.speed.y = (-jumpSpeed)
      else // 碰到物体时，按下键和 y 坐标 <= 0 ,y坐标始终为0（不会继续下落）
        this.speed.y = 0
    }
    else { // 没碰到物体，更新位置
      this.pos = newPos
    }
  }


  /**
   * act - 运动函数 (玩家会水平和垂直移动)
   *
   * @param  {Number} step  速度向量
   * @param  {Level}  level 游戏地图对象
   * @param  {Object} keys  按键键值对象
   */
  act(step, level, keys) {
    /* 1.整合水平垂直运动逻辑 */
    this.moveX(step, level, keys)
    this.moveY(step, level, keys)

    /* 2.碰到活动元素的逻辑 */
    // 碰到硬币的逻辑(搜集或通关)
    // 碰到熔岩(死亡)
    const otherActor = level.actorAt(this)
    if (otherActor)
      level.playerTouched(otherActor.type, otherActor)

    /* 3.游戏失败 */
    // 游戏失败时会有玩家渐渐消融的效果
    if (level.status === 'lost') {
      this.pos.y  += step
      this.size.y -= step
    }
  }
}
