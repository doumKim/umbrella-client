type weatherVal = {
  [key: string]: string | string[] | undefined;
  iconName: string;
  backdrop: string;
};
type weatherTypes = {
  [key: string]: weatherVal;
  Thunderstorm: weatherVal;
  Drizzle: weatherVal;
  Rain: weatherVal;
  Snow: weatherVal;
  Atmosphere: weatherVal;
  Clear: weatherVal;
  Clouds: weatherVal;
  Mist: weatherVal;
  Dust: weatherVal;
  Haze: weatherVal;
};

export const WeatherDB: weatherTypes = {
  Thunderstorm: {
    iconName: 'ttps://i.ibb.co/92R6FCj/thunder.png',
    backdrop: '#373B44',
  },
  Drizzle: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: '#89F7FE',
  },
  Rain: {
    iconName: 'https://i.ibb.co/ZYD9W7B/rainy.png',
    backdrop: '#00C6FB',
  },
  Snow: {
    iconName: 'https://i.ibb.co/rtNYFMY/snowy.png',
    backdrop: '#7DE2FC',
  },
  Atmosphere: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: '#89F7FE',
  },
  Clear: {
    iconName: 'https://i.ibb.co/FKc6hzh/sunny.png',
    backdrop: '#FF7300',
  },
  Clouds: {
    iconName: 'https://i.ibb.co/NW99Jb8/cloudy.png',
    backdrop: '#D7D2CC',
  },
  //안개~
  Mist: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: '#4DA0B0',
  },
  Dust: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: '#4DA0B0',
  },
  Haze: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: '#4DA0B0',
  },
};
