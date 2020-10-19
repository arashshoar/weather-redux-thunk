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
    hourly: [
      {
        weather: [],
        rain: 0
      },
    ]
  }
}
