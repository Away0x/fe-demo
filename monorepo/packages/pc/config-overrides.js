const path = require('path');
const { override, babelInclude } = require('customize-cra');

const pathResolve = (p) => path.resolve(p);

module.exports = override(
  // 使项目可以引入外部文件
  babelInclude([pathResolve('src'), pathResolve('../components')]),
);
