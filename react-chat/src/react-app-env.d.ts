/// <reference types="react-scripts" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    green: string;
    gray: string;
    red: string;
    red2: string;
    darkPurple: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
    grayDark: string;
    grayDark2: string;
    grediantGray: string;

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
