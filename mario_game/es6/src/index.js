/* 项目入口文件 */

import { GAME_LIVES, actorChars, arrowCodes, GAME_LEVELS } from './config'
import Level from './Level'
import { trackKeys, runAnimation } from './utils'
import DOMDisplay    from './draw/DOM'
import CanvasDisplay from './draw/Canvas'

/**
 * runLevel - 游戏运行函数
 *
 * @param  {Level}    level    Level对象
 * @param  {Display}  Display  绘制方法
 * @param  {Function} callback 回调
 */
function runLevel(level, Display, callback) {
  const display = new Display(document.body, level)
  let running = 'yes'
  // esc暂停游戏和继续游戏
  function handleKey(event) { // 事件处理函数
    if (event.keyCode === 27) {
      if (running === 'no') {
        running = 'yes'
        console.log('游戏继续')
        runAnimation(animation)
      }
      else if (running === 'pausing') {
        console.log('游戏继续')
        running = 'yes'
      }
      else if (running === 'yes') {
        console.log('游戏暂停')
        running = 'pausing'
      }
    }
  }

  addEventListener('keydown', handleKey)
  const arrows = trackKeys(arrowCodes)

  function animation(step) {
    if (running === 'pausing') {
      running = 'no'
      return false
    }
    level.animate(step, arrows)
    display.drawFrame(step)
    // 游戏结束
    if ( level.isFinished() ) {
      display.clear()
      // 注销事件
      removeEventListener('keydown', handleKey)
      arrows.unregister()
      callback && callback(level.status)
      return false
    }
  }
  runAnimation(animation)
}


/**
 * runGame - 游戏启动函数
 *
 * 一个游戏是一个关卡序列。
 * 当玩家死亡就重新开始当前关卡
 * 当完成关卡后，就切换到下一关
 *
 * @param  {Array}   plans   游戏地图(关卡数组)
 * @param  {Display} Display 绘制方法
 */
function runGame(plans, Display) {
  function startLevel(n, lives) {
    const level = new Level(plans[n], actorChars)
    runLevel(level, Display, status => {
      if (status === 'lost') {
        if (lives > 0) {
          alert('Your life have ' + lives)
          startLevel(n, lives - 1)
        }
        else {
          alert('Game over')
          startLevel(0, GAME_LIVES) // 从第一关开始,且恢复生命
        }
      }
      else if ( n < (plans.length - 1) )
        startLevel(n + 1, lives) // 进入下一关
      else
        console.log('You win!') // 打通游戏
    })
  }
  startLevel(0, GAME_LIVES - 1)
}


/* ######################### 整个游戏在这里启动 ######################### */
// 1.用 DOM 来绘制游戏
// runGame(GAME_LEVELS, DOMDisplay)
// 2.用canvas来绘制游戏
runGame(GAME_LEVELS, CanvasDisplay)
