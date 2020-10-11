const forecastWeatherDataForAxios = {
  data: {
    lat: 37.31,
    lon: -121.98,
    timezone: 'America/Los_Angeles',
    timezone_offset: -25200,
    current: {
      dt: 1602341474,
      sunrise: 1602339099,
      sunset: 1602380250,
      temp: 57.52,
      feels_like: 54.28,
      pressure: 1015,
      humidity: 82,
      dew_point: 52.07,
      uvi: 5.26,
      clouds: 75,
      visibility: 10000,
      wind_speed: 6.93,
      wind_deg: 150,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d'
        }
      ]
    },
    hourly: [
      {
        dt: 1602338400,
        temp: 57.52,
        feels_like: 56.1,
        pressure: 1015,
        humidity: 82,
        dew_point: 52.07,
        clouds: 75,
        visibility: 10000,
        wind_speed: 3.69,
        wind_deg: 157,
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n'
          }
        ],
        pop: 0
      },
      {
        dt: 1602342000,
        temp: 59.14,
        feels_like: 58.84,
        pressure: 1015,
        humidity: 80,
        dew_point: 52.99,
        clouds: 87,
        visibility: 10000,
        wind_speed: 2.19,
        wind_deg: 200,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        pop: 0
      },
    ],
    daily: [
      {
        dt: 1602356400,
        sunrise: 1602339099,
        sunset: 1602380250,
        temp: {
          day: 70.23,
          min: 57.52,
          max: 75.51,
          night: 62.38,
          eve: 72.61,
          morn: 57.52
        },
        feels_like: {
          day: 71.01,
          night: 61.99,
          eve: 70.56,
          morn: 57.27
        },
        pressure: 1016,
        humidity: 58,
        dew_point: 54.77,
        wind_speed: 1.23,
        wind_deg: 354,
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
          }
        ],
        clouds: 94,
        pop: 0,
        uvi: 5.26
      },
      {
        dt: 1602442800,
        sunrise: 1602425554,
        sunset: 1602466565,
        temp: {
          day: 70.21,
          min: 58.32,
          max: 76.68,
          night: 62.69,
          eve: 75.31,
          morn: 58.98
        },
        feels_like: {
          day: 67.48,
          night: 61.25,
          eve: 70.41,
          morn: 58.39
        },
        pressure: 1018,
        humidity: 49,
        dew_point: 50.72,
        wind_speed: 5.08,
        wind_deg: 345,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        clouds: 10,
        pop: 0,
        uvi: 5.7
      },
    ]
  }
}

module.exports = forecastWeatherDataForAxios
