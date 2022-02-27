# Config

```javascript
// config/api.js 添加
const APIConfig = {
    baseUrl: 'https://qinchenju.com/homemaking',
    iCode: '',
    orderNo: '',
};

export default APIConfig;

// config/tim.js
const timConfig = {
    appId: '',
    // 0 普通级别，日志量较多，接入时建议使用
    // 1 release 级别，SDK 输出关键信息，生产环境时建议使用
    logLevel: 1,
};

export default timConfig;
```

# Npm 构建

-   开发者工具 -> 工具 -> 构建 npm
