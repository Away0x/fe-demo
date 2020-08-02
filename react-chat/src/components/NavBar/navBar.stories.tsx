import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'containers/theme';
import NavBar, { MenuItem } from '.';

export default {
  title: '页面组件/NavBar',
  component: NavBar,
};

export const Default = () => (
  <Router>
    <NavBar />
  </Router>
);

export const Menu = () => {
  return (
    <Router>
      <div
        style={{
          backgroundColor: theme.darkPurple,
          width: '100px',
        }}>
        <MenuItem showBadge icon={faCommentDots} />
      </div>
    </Router>
  );
};
