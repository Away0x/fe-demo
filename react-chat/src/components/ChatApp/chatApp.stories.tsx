import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ChatApp from '.';

export default {
  title: 'ChatApp',
  component: ChatApp,
};

export const Default = () => (
  <Router>
    <ChatApp />
  </Router>
);
