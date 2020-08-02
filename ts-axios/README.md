# ts-axios

TypeScript 仿写 axios

## 需求分析

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSRF

## 项目初始化

- 使用了 [typescript-library-starte](https://github.com/alexjoverm/typescript-library-starter)
  - 使用 RollupJS 帮助我们打包。
  - 使用 Prettier 和 TSLint 帮助我们格式化代码以及保证代码风格一致性。
  - 使用 TypeDoc 帮助我们自动生成文档并部署到 GitHub pages。
  - 使用 Jest 帮助我们做单元测试。
  - 使用 Commitizen 帮助我们生成规范化的提交注释。
  - 使用 Semantic release 帮助我们管理版本和发布。
  - 使用 husky 帮助我们更简单地使用 git hooks。
  - 使用 Conventional changelog 帮助我们通过代码提交信息自动生成 change log。
