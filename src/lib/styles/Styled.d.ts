import 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      mainBackground: string;
      scheduleCard: string;
      profileCard: string;
      title: string;
      brightFont: string;
      actvie: string;
      main: string;
      sub: string;
      subSub: string;
    };
  }
}
