import React from 'react';

import { GlobalStyle } from '@/assets/style/style';
import { IconStyle } from '@/assets/iconfont/iconfont';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <IconStyle />

      <i className="iconfont">&#xe62b;</i>
    </div>
  );
}

export default App;
