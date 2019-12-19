import React from 'react';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import { GlobalStyle } from '@/assets/style/global';
import { IconStyle } from '@/assets/iconfont/iconfont';
import routes from './routes';
import store from '@/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        {/* 通用样式 */}
        <GlobalStyle />
        <IconStyle />

        { renderRoutes(routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
