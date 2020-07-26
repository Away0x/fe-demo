/// <reference types="react-scripts" />

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    green: string;
    gray: string;
    red: string;
    darkPurple: string;

    normal: string;
  }
}
