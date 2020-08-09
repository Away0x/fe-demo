// 每次跑测试都会先执行该文件 (jest setupFilesAfterEnv 中设置了)

const JasmineCore = require('jasmine-core')
// 这里为了让 jasmine-ajax 插件运行成功，我们需要手动添加全局的 getJasmineRequireObj 方法
// https://github.com/jasmine/jasmine-ajax/issues/178
// @ts-ignore
global.getJasmineRequireObj = function() {
  return JasmineCore
}
require('jasmine-ajax')
