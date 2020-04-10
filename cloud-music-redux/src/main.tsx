import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'development') {
  // DEVELOPMENT
  if ((module as any).hot) {
    (module as any).hot.accept('./App', () => render());
  }

  render();
} else {
  // PRODUCTION
  render();
}

serviceWorker.unregister();
