import axios from 'axios'

export const getUrl = ({ name, accessKey, locationName, token, coords, latitude, longitude }) => {

  switch (name) {
  case 'coordsQuery':
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${token}`
  case 'locationNameQuery':
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${token}`
  case 'weatherQueryCurrent':
    return `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${latitude}&lon=${longitude}&appid=${accessKey}`
  case 'weatherQueryForecast':
    return `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${accessKey}`
  case 'googleMap':
    return `https://maps.googleapis.com/maps/api/js?key=${accessKey}&callback=initMap`
  default:
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${token}`
  }
}

export const roundCoords = coords => coords.split(',').map(elem => Math.round(elem * 100)/100).join(',')

export const getLocationName = mapData => {
  const {features: places} = mapData
  let cityName
  let countryName

  for (let place of places) {
    if (place['place_type'][0] === 'place') {
      cityName = place.text
    }
    if (place['place_type'][0] === 'country') {
      countryName = place.text
    }
  }

  if (!cityName) {
    for (let place of places) {
      if (place['place_type'][0] === 'postcode') {
        cityName = place['place_name'].split(',')[0]
      }
    }
  }

  if (!countryName) {
    countryName = places[places.length - 1].text
    if (!cityName) {
      cityName = countryName
    }
  }

  return {
    cityName,
    countryName
  }
}

export const isStoredDataFresh = storageTime => {
  const date = new Date()
  const sDate = new Date(Number(storageTime))

  return date.getTime() - sDate.getTime() < 3600000
}

const getRoundLatLng = (latitude, longitude) => {
  const roundLat = Math.round(latitude * 100) / 100
  const roundLng = Math.round(longitude * 100) / 100

  return ({roundLat, roundLng})
}

export const getStoredData = (storeKey, latitude, longitude) => {
  const { roundLat, roundLng } = getRoundLatLng(latitude, longitude)
  const storedCurrentWeatherData = JSON.parse(window.localStorage.getItem(storeKey + roundLat + roundLng))
  const storageTime = JSON.parse(window.localStorage.getItem(storeKey + 'Time' + roundLat + roundLng))

  return storedCurrentWeatherData && isStoredDataFresh(storageTime) ? storedCurrentWeatherData.data : false
}

export const getFreshWeatherData = async (weatherQueryKey, storeKey, latitude, longitude) => {
  const { roundLat, roundLng } = getRoundLatLng(latitude, longitude)

  const data = await axios.get(getUrl({
    name: weatherQueryKey,
    accessKey: process.env.REACT_APP_WEATHER,
    latitude: roundLat,
    longitude: roundLng,
  }))
  window.localStorage.setItem(storeKey + 'Time' + roundLat + roundLng, JSON.stringify(new Date().getTime()))
  window.localStorage.setItem(storeKey + roundLat + roundLng, JSON.stringify(data))

  return data.data
}

export const getDateTimeFromMilSecs = miliSec => {
  const localDate = new Date(Number(miliSec + '000'))
  let [localTime, AMPM] = localDate.toLocaleTimeString().split(' ')

  return {
    time: `${localTime.split(':').slice(0, 2).join(':')} ${AMPM}`,
    date: `${localDate.getMonth()}/${localDate.getDate()}`
  }
}

export const joinDesOfWeather = weather => weather.reduce(
  (wholeDesc, weather) => (`${wholeDesc} ${weather.description}`), ''
)

export const firstLetterUp = str => str[1].toUpperCase() + str.substr(2).toLocaleLowerCase()

export const getDesOfWeather = weather => firstLetterUp(joinDesOfWeather(weather))
