import Vector from './../type/Vector'

/**
 * class Level   地图
 */
export default class Level {
  // plan -> 定义关卡的数组; actorChars -> 存储字符与活动元素类型对象映射的对象
  constructor(plan, actorChars) {
    this.actorChars = actorChars
    this.width      = plan[0].length // 地图宽度
    this.height     = plan.length    // 地图高度
    this.grid       = []             // 地图网格（内部有整个地图每一行的格子类型）
    // 活动元素 // 保存对象，并跟踪关卡中动态元素的位置和状态
    // 每个活动元素都包含以下属性:
    // pos: 给定元素的当前位置（左上角坐标）
    // size: 给定元素的尺寸
    // type: 保存表示元素类型的字符串，如 lava, coin, player
    this.actors = []

    /* 1.生成类型地图 */
    for (let y = 0; y < this.height; y++) {
      let line     = plan[y],  // 地图的每一行
          gridLine = []

          for (let x = 0; x < this.width; x++) {
            let ch        = line[x], // ch 为地铁每一行的每一个格子的字符 @ x ...
                fieldType = null,    // 格子的类型
                Actor     = this.actorChars[ch] // 取到映射的对象 // Lava Coin Player

            if (Actor) // 说明该格子中是玩家，熔岩或硬币
              this.actors.push(new Actor(new Vector(x, y), ch)) //构造对象并存储
            else if (ch === 'x') // 墙
              fieldType = 'wall'
            else if (ch === '!') // 静止状态的熔岩
              fieldType = 'lava'

            gridLine.push(fieldType) // gridLine为存储一行各个格子的类型数组
          }
          this.grid.push(gridLine)
          // console.log(this.grid)
    }

    /* 2.找到玩家 */
    this.player = this.actors.filter(actor => actor.type === 'player')[0]

    /* 3.记录胜负相关信息 */
    this.status      = null // 记录选手的胜负信息
    this.finishDelay = null // 让游戏结束或进入下一关时有一段延迟来显示简单动画
  }


  /**
   * obstacleAt - 玩家是否于其他活动元素碰撞
   * 判断某个矩形（通过位置与尺寸限定）是否会覆盖在背景网格的非空白区域中
   *
   * @param  {type} pos  元素的坐标
   * @param  {type} size 元素的大小
   * @return {type}      碰撞元素的类型
   */
  obstacleAt(pos, size) {
    /* 1.处理元素坐标 */
    const xStart = Math.floor(pos.x),
          xEnd   = Math.ceil(pos.x + size.x),
          yStart = Math.floor(pos.y),
          yEnd   = Math.ceil(pos.y + size.y)

    /* 2.位置是否在不可触碰区 */
    // 元素处于关卡地图之外且触碰到左右边界或上边界
    if ( (xStart < 0) || (xEnd > this.width) || (yStart < 0) )
      return 'wall'
    if (yEnd > this.height) // 地表以下都是熔岩
      return 'lava'

    /* 3.元素在网格中时，循环扫描其覆盖的网格，返回第一个找到的非空白方格 */
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        let fieldType = this.grid[y][x]
        if (fieldType)
          return fieldType
      }
    }
  }


  /**
   * actorAt - 扫描活动元素数组并找出与参数中的活动元素重叠的活动元素
   *
   * @param  {Lava || Player || Coin} actor 活动元素对象
   * @return {Lava || Player || Coin}       活动元素对象
   */
  actorAt(actor) {
    for (var i = 0; i < this.actors.length; i++) {
      let other = this.actors[i];
      if (other != actor &&
          actor.pos.x + actor.size.x > other.pos.x &&
          actor.pos.x < other.pos.x  + other.size.x &&
          actor.pos.y + actor.size.y > other.pos.y &&
          actor.pos.y < other.pos.y  + other.size.y)
        return other;
    }
  }


  /**
   * animate - 让关卡中的每个活动元素都有一次移动的机会
   *
   * @param  {type} step 速度向量
   * @param  {type} keys 键值对象
   */
  animate(step, keys) {
    const maxStep = 0.05 // 时间间隔

    if (this.status !== null) // status 非空表玩家胜利或失败
      this.finishDelay -= step // 倒计时， finishDelay 保存了玩家胜利或失败之后游戏继续展示关卡的时间

    while (step > 0) {
      const thisStep = Math.min(step, maxStep)
      this.actors.forEach(actor => {
        actor.act(thisStep, this, keys) // 每个活动对象均执行运动函数
      })
      step -= thisStep
    }
  }

  /**
   * playerTouched - 检测玩家是否与其他活动元素碰撞
   *
   * @param  {String}                 type  活动元素的类型
   * @param  {Lava || Player || Coin} actor 活动元素
   */
  playerTouched(type, actor) {
    if (type === 'lava' && this.status === null) { // 碰到熔岩，被烧死
      this.status      = 'lost'
      this.finishDelay = 1
    }
    else if (type === 'coin') { // 搜集硬币
       // 从地图中移出硬币
      this.actors = this.actors.filter(other => other != actor)
      // 没有硬币了
      let noCoins = ! this.actors.some(actor => actor.type === 'coin')
      if (noCoins) { // 硬币搜集完成，通关
        this.status = 'won'
        this.finishDelay = 1
      }
    }
  }


  /**
   * isFinished - 判断游戏结束(胜利 or 失败)
   *
   * @return {Boolean}  判断结果
   */
  isFinished() {
    return (this.status !== null) && (this.finishDelay < 0)
  }
}
