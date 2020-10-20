export const storeStateIint = {
  isSearchDone: false,
  cityName: 'Data is loading...',
  countryName: 'Data is loading...',
  currentWeatherData: {
    main: {
      temp: 12,
      temp_max: 14,
      temp_min: 3,
    },
    dt: '',
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
  },
  mapData: {
    features: []
  },
  forecastWeatherData: {
    timezone_offset: '-25200',
    current: {},
    hourly: [
      {
        dt: '1603220400',
        weather: [
          {
            description: ''
          }
        ],
        rain: 0
      },
    ],
    daily: [
      {
        temp: 12,
        min: 1,
        max: 14,
        dt: '1603220400',
        sunrise: 1603203641,
        sunset: 1603243408,
        weather: [
          {
            description: ''
          }
        ],
      }
    ]
  }
}
