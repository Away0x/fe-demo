import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { routerManager } from './routes';

function Routes() {
  return (
    <Router>
      {routerManager.render()}
    </Router>
  );
}

export default React.memo(Routes);
