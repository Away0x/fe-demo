import React from 'react';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'containers/theme';
import NavBar, { MenuItem } from '.';

export default {
  title: '页面组件/NavBar',
  component: NavBar,
};

export const Default = () => <NavBar />;

export const Menu = () => {
  return (
    <div
      style={{
        backgroundColor: theme.darkPurple,
        width: '100px',
      }}>
      <MenuItem showBadge icon={faCommentDots} />
    </div>
  );
};
