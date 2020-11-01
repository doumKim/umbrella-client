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
    iconName: 'https://i.ibb.co/92R6FCj/thunder.png',
    backdrop: 'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
  },
  Drizzle: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: 'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
  },
  Rain: {
    iconName: 'https://i.ibb.co/ZYD9W7B/rainy.png',
    backdrop: 'https://i.ibb.co/b2g83kt/backdrop-rainy.png',
  },
  Snow: {
    iconName: 'https://i.ibb.co/rtNYFMY/snowy.png',
    backdrop: 'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
  },
  Atmosphere: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: 'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
  },
  Clear: {
    iconName: 'https://i.ibb.co/FKc6hzh/sunny.png',
    backdrop: 'https://i.ibb.co/VByZP3W/backdrop-sunny.png',
  },
  Clouds: {
    iconName: 'https://i.ibb.co/NW99Jb8/cloudy.png',
    backdrop: 'https://i.ibb.co/j4hxLcF/backdrop-cloudy.png',
  },
  //안개~
  Mist: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: 'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
  },
  Dust: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: 'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
  },
  Haze: {
    iconName: 'https://i.ibb.co/F677ctj/drizzle.png',
    backdrop: 'https://i.ibb.co/rtzXPSH/backdrop-etc.png',
  },
};
