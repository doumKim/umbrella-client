import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      mainBackground: string;
      title: string;
      actvie: string;
      main: string;
      sub: string;
    };
  }
}
