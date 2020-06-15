// import 'react-app-polyfill/ie9';
// import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import '@/styles/index.less';
import App from '@/App';
import * as serviceWorker from '@/serviceWorker';
import { yymmddhhmmss } from '@/tools/date';
import '@/tools/rem';

(window as any).__project__ = (() => {
  const info: any = {
    version: process.env.REACT_APP_VERSION,
    branche: process.env.REACT_APP_BRANCHE,
    build_timestamp: process.env.REACT_APP_BUILD_TIMESTAMP,
    desc: process.env.REACT_APP_DESC,
  };

  if (info.build_timestamp) {
    info.build_time = yymmddhhmmss(new Date(info.build_timestamp));
  }

  return info;
})();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
