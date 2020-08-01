# scripts

```bash
# dev build test
yarn start/build/test

# storybook
# dev
yarn storybook
# build
yarn build-storybook

# hygen
# 生成通用组件模板
yarn g-component 组件名(首字母大写)
```

# 注意点

```typescript
import React from 'react';

import StyledButton from './style';

interface ButtonProps {
  children: React.ReactNode;
}

// 这里的 rest，是为了传递给 styled-components 组件的，不这样的话，当使用 style(Button) 时会定义不了样式
function Button({ children, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
```
