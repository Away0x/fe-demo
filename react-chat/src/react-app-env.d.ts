/// <reference types="react-scripts" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    green: string;
    gray: string;
    red: string;
    darkPurple: string;
    gray2: string;
    gray3: string;
    gray4: string;
    grayDark: string;

    background: string;
    inactiveColor: string;
    inactiveColorDark: string;

    normal: string;
    medium: string;
    large: string;
    xlarge: string;
    xxlarge: string;
    small: string;
    xsmall: string;
    xxsmall: string;
  }
}
