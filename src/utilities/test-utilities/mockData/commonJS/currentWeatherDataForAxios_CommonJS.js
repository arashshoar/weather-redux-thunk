const currentWeatherDataForAxios = {
  data: {
    main: {
      temp: 12,
      temp_max: 14,
      temp_min: 3,
    },
    dt: '000000000',
    wind: {},
    sys: {},
    weather: [
      {
        description: 'smoke'
      },
      {
        description: 'Haze'
      }
    ]
  }
}

module.exports = currentWeatherDataForAxios
