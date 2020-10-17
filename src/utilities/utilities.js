import axios from 'axios'
import { backgroundSrcSets } from 'utilities/backgroundPathes'

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
  const { features: places } = mapData
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

  return ({ roundLat, roundLng })
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

export const getDateFromMilSeconds = (milli, timeZone) => {
  if (!milli) {
    return 'loading'
  }

  const date = new Date(Number(milli + '000') + Number(timeZone + '000'))
  const [year, month, day] = date.toISOString().split('T')[0].split('-')
  return `${month[0] === '0' ? month.substr(1) : month}/${day[0] === '0' ? day.substr(1) : day }`
}

export const joinDesOfWeather = weather => weather.reduce(
  (wholeDesc, weather) => (`${wholeDesc} ${weather.description}`), ''
)

export const firstLetterUp = str => str[1].toUpperCase() + str.substr(2).toLocaleLowerCase()

export const getDesOfWeather = weather => firstLetterUp(joinDesOfWeather(weather))

export const getBackgroundsSrc = () => {
  const randomBackgroundIndex = Math.round(Math.random() * 100) % backgroundSrcSets.length

  const clientWidth = document.documentElement.clientWidth
  // const clientHeight = document.documentElement.clientHeight
  // const imageLength = Math.sqrt(clientHeight ** 2 + clientWidth ** 2)
  // const imageLength = Math.max(clientHeight, clientWidth)
  const imageLength = clientWidth
  const imageFlavors = backgroundSrcSets[randomBackgroundIndex].split(',')
  const imageFlavorIndex = imageFlavors.reduce((resultIndex, imageFlavor, currentIndex ) => {
    const flavorWidth = parseInt(imageFlavor.split(' ')[2])
    return flavorWidth > imageLength && !resultIndex ? currentIndex : resultIndex
  }, undefined)

  return backgroundSrcSets[randomBackgroundIndex].split(',')[imageFlavorIndex === undefined ? imageFlavors.length - 1 : imageFlavorIndex].split(' ')[1]
}

export const getUserCurrentPosition = options => (
  new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
)

export const getLatLngFromCoords = coords => {
  if (typeof (coords) === 'string') {
    return ({
      latitude: Number(coords.split(',')[1]),
      longitude: Number(coords.split(',')[0]),
    })
  }

  if (Array.isArray(coords)) {
    return ({
      latitude: coords[1],
      longitude: coords[0]
    })
  }
}

export const getPlaceDescription = placeName => {
  const placeNameArr = placeName.split(',')
  const placeNameLastIndex = placeNameArr.length - 1

  return placeNameArr[placeNameLastIndex]
}

export const getTemp = (unitFC, fTemp) => unitFC === 'f' ? Math.round(fTemp) : Math.round((fTemp - 32) * (5/9))

export const getDayHours = (sunRise, sunSet) => {
  const hours = Math.round(((sunSet + '000') - (sunRise + '000')) / 360000) / 10

  return isNaN(hours) ? 'Loading' : hours
}

export const getTimeFromMilliSeconds = (milli, timeZone) => {
  if (!milli) {
    return 'loading'
  }

  const date = new Date(Number(milli + '000') + Number(timeZone + '000'))
  const time = date.toISOString().split('T')[1].split(':')
  return `${time[0][0] === '0' ? time[0].substr(1) : time[0]}:${time[1]}`
}

export const getQuarter = ({ sunRise, sunSet, dt }) => {
  const sunRiseMilliSeconds = Number(sunRise + '000')
  const sunSetMilliSeconds = Number(sunSet + '000')
  const currentMilliSeconds = Number(dt + '000')
  const dayQuarter = (sunRiseMilliSeconds - currentMilliSeconds) / (sunRiseMilliSeconds - sunSetMilliSeconds)

  return Math.round(dayQuarter * 100) / 100
}

// export const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

// export const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key))
