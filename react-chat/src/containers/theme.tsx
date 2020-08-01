import React from 'react';
import {
  DefaultTheme,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';

export const theme: DefaultTheme = {
  primaryColor: '#4F9DDE',
  green: '#34D859',
  gray: 'rgba(24, 28, 47, 0.2)',
  red: '#F34848',
  darkPurple: '#292F4C',
  gray2: 'rgba(241, 237, 237, 0.3)',
  gray3: 'rgba(24, 28, 47, 0.3)',
  gray4: '#EFECE8',
  grayDark: '#181C2F',

  background: 'white',
  inactiveColor: 'rgba(41, 47, 76, 0.3)',
  inactiveColorDark: 'white',

  normal: '1.4rem',
  medium: '1.6rem',
  large: '1.8rem',
  xlarge: '2rem',
  xxlarge: '2.4rem',
  small: '1.2rem',
  xsmall: '1rem',
  xxsmall: '0.8rem',
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
