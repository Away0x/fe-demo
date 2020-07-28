import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import './story.css';
import { theme } from '../src/containers/theme';

addDecorator((storyFn) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
));

addParameters({
  options: {
    showRoots: true,
  },
});
