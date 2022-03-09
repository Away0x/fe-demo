var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: "./src/index.js",
  resolve: {
      extensions: ["", ".js"]
  },
  module: {
      loaders: [
          {
    				test:/.css$/,
    				loaders:["style","css"],
    			},
          {
              test: /\.js?$/,
              include: [path.join(__dirname, "src"), path.join(__dirname, "data")],
              loaders: ["babel"],
          },
          {
            test: /\.(png|jpg)$/,
            loaders: ['url?limit=8192&name=image/[name].[ext]']
          }
      ]
  },
  output: {
      path: "./dist",
      filename: "index.js",
      // 因为打包在内存里，所以这里设置下文件夹，就可以在该路径下访问到打包脚本了
      publicPath: "http://localhost:8097/dist",
  },
}
