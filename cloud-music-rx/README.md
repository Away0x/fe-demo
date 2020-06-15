# react hooks + rxjs + immer.js 实现仿网易云音乐 WebApp

- 参考 https://github.com/sanyuan0704/react-cloud-music

## 项目目录结构
<details>
<summary>展开查看</summary>
<pre><code>
├── assets           图片字体等资源
│
├── styles           全局样式
│
├── components       公用组件
│
├── config           配置
│
├── constants        常量
│
├── interactors      业务层 (处理比较复杂的业务逻辑，比如需要连接多个 store)
│
├── pages            页面
│
├── services         数据层
│
├── store            状态管理
│
├── tools            工具类、工具函数
│
├── App.tsx          根组件
│
└── index.tsx        入口
</code></pre>
</details>

- 顶层目录的 `stores`、`services`、`interactors` 存放的是全局通用的逻辑
- `page`、`component` 组件目录可单独存在 `store`、`service`、`interactor` 文件，用于管理自身逻辑
- `store` 通过 `rxjs` 管理
- 样式
  - 全局样式放在根目录 `styles/global` 中，类命名规则使用 **BEM**，且有统一前缀 `g`
    - 例: `g-header__title`
  - 各组件自身的样式尽量使用 less module 编写，文件命名规则为 `组件名.module.less`，类命名使用驼峰
    - 如未使用 module 则需要使用一个 className 命名空间，命名规则为 `组件名-componet/page`
