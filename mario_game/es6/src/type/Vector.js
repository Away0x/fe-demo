/**
 *  class Vector   矢量类： 存储活动元素的位置和坐标
 */
export default class Vector {
  // x -> 坐标 x; y -> 坐标 y
  constructor(x, y) {
    this.x = x
    this.y = y
  }


  /**
   * plus - 坐标相加，实现坐标移动
   *
   * @param  {Object} other 矢量对象
   * @return {Vector}       返回一个新的坐标矢量
   */
  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y)
  }


  /**
   * time - 坐标乘积
   * 可根据指定数字来缩放向量
   * 当需计算特定时间内元素移动的距离时，可用该方法计算一个速度向量与时间间隔的乘积
   *
   * @param  {Number} factor 乘数
   * @return {Vector}        返回一个新的坐标矢量
   */
  times(factor) {
    return new Vector(this.x * factor, this.y * factor)
  }
}
