import axios from 'axios'
import { backgroundSrcSets } from 'utilities/backgroundPathes'
import { SRC, weatherConditions } from './constants'
import { getGoogleMapDarkStyles } from './googleMapDarkStyles'

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
  const [ , month, day] = date.toISOString().split('T')[0].split('-')
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

export const getApplicationBackground = () => {
  const backgroundImage = getBackgroundsSrc()

  console.log("++++++||||||", backgroundImage)

  setAddBackgroundElement(backgroundImage)

  if (isMobile()) {
    setTimeout(addBlurToBackground, 500)
    // setting CurrentTemp height as Mobiles
    document.querySelector('[class*="CurrentTemp_currentTemp"]').style.minHeight = `${document.documentElement.clientHeight}px`
  }
}

export const setAddBackgroundElement = (backgroundImage) => {
  const divBackGround = document.createElement('div')
  divBackGround.setAttribute('class', 'divBackGround')
  divBackGround.style.backgroundImage = `url(${backgroundImage})`
  divBackGround.style.minWidth = document.documentElement.clientWidth + 'px'
  divBackGround.style.minHeight = document.documentElement.clientHeight + 'px'
  divBackGround.style.width = '100%'
  divBackGround.style.height = '100%'
  divBackGround.style.position = 'fixed'
  divBackGround.style.zIndex = '-1000'
  document.body.prepend(divBackGround)
}

export const addBlurToBackground = () => {
  window.onscroll = () => {
    const elem = document.querySelector('.divBackGround')
    if (!elem.style.filter) {
      elem.style.filter = 'blur(5px)'
    }
    if (!elem.style.WebkitFilter) {
      elem.style.WebkitFilter = 'blur(5px)'
    }
  }
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

export const setCoordsOfLatitudeLongitude = (latitude, longitude) => `${longitude}, ${latitude}`

export const getPlaceDescription = placeName => {
  const placeNameArr = placeName.split(',')
  const placeNameLastIndex = placeNameArr.length - 1

  return placeNameArr[placeNameLastIndex]
}

export const farenheitToCelcius = fTemp => Math.round((fTemp - 32) * (5/9))

export const meterPerSecToMph = meterPerSec => Math.round(meterPerSec * 2.237 * 10) / 10

export const meterPerSecToKph = meterPerSec => Math.round(meterPerSec * 3.6 * 10) / 10

export const meterToMiles = meter => Math.round(meter / 1609 * 10) / 10

export const getTemp = (unitFC, fTemp) => unitFC === 'f' ? Math.round(fTemp) : farenheitToCelcius(fTemp)

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

export const getHourAMPM = time => {
  const hour = Number(time.split(':')[0])

  return hour > 12 ? `${hour - 12} PM` : `${hour} ${hour === 12 ? 'PM' : 'AM'}`
}

export const getDay = (milli, timeZone) => {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday']
  const date = new Date(Number(milli + '000') + Number(timeZone + '000'))
  return weekDays[date.getDay()]
}

export const getQuarter = ({ sunRise, sunSet, dt }) => {
  const sunRiseMilliSeconds = Number(sunRise + '000')
  const sunSetMilliSeconds = Number(sunSet + '000')
  const currentMilliSeconds = Number(dt + '000')
  const dayQuarter = (sunRiseMilliSeconds - currentMilliSeconds) / (sunRiseMilliSeconds - sunSetMilliSeconds)

  return Math.round(dayQuarter * 100) / 100
}

export const getIfItIsDay = (sunRise, sunSet, dt) => dt >= sunRise && dt < sunSet

export const getWindDir = degree => {
  degree = degree % 360
  switch (true) {
    case (degree < 22.5 || degree >= 337.5):
      return 'North'
    case (degree > 22.5 && degree <= 67.5):
      return 'NW'
    case (degree > 67.5 && degree <= 112.5):
      return 'West'
    case (degree > 112.5 && degree <= 157.5):
      return 'SW'
    case (degree > 157.5 && degree <= 202.5):
      return 'South'
    case (degree > 202.5 && degree <= 247.5):
      return 'SE'
    case (degree > 247.5 && degree <= 292.5):
      return 'East'
    case (degree > 292.5 && degree < 337.5):
      return 'NE'
    default:
      return 'not a degree'
  }
}

export const getPrecipitationIcon = description => {
  const { lightRain, moderateRain, heavyRain, veryHeavyRain, extremeRain, lightRainAndSnow, snow, thunderstorm } = weatherConditions

  switch (true) {
    case (lightRain.includes(description)):
      return SRC.rainIcon20
    case (moderateRain.includes(description)):
      return SRC.rainIcon40
    case (heavyRain.includes(description)):
      return SRC.rainIcon60
    case (veryHeavyRain.includes(description)):
      return SRC.rainIcon80
    case (extremeRain.includes(description)):
      return SRC.rainIcon100
    case (lightRainAndSnow.includes(description)):
      return SRC.lightRainAndSnow
    case (snow.includes(description)):
      return SRC.snow
    case (thunderstorm.includes(description)):
      return SRC.thunderstorm
    default:
      return SRC.rainIcon0
  }
}

export const getWeatherIcon = (description, isDay) => {
  description = description.toLowerCase()

  switch (true) {
    case (description === 'clear sky' && isDay):
      return SRC.clearDayIcon
    case (description === 'clear sky' && !isDay):
      return SRC.clearNightIcon
    case (description === 'few clouds' && isDay):
      return SRC.fewCloudsDayIcon
    case (description === 'few clouds' && !isDay):
      return SRC.fewCloudsNightIcon
    case (description === 'fog'):
      return SRC.mostlyCloudyDayNight
    case (description === 'mist'):
      return SRC.mostlyCloudyDayNight
    case (description === 'scattered clouds'):
      return SRC.scatteredClouds
    case (description === 'broken clouds'):
      return SRC.scatteredClouds
    case (description === 'overcast clouds'):
      return SRC.overcastClouds
    case (description === 'light rain'):
      return SRC.lightRain
    case (description === 'moderate rain'):
      return SRC.lightRain
    case (description === 'heavy intensity rain'):
      return SRC.heavyIntensityRain
    case (description === 'very heavy rain'):
      return SRC.heavyIntensityRain
    case (description === 'extreme rain'):
      return SRC.heavyIntensityRain
    case (description === 'freezing rain'):
      return SRC.lightRainAndSnow
    case (description === 'light intensity shower rain'):
      return SRC.heavyIntensityRain
    case (description === 'shower rain'):
      return SRC.heavyIntensityRain
    case (description === 'heavy intensity shower rain'):
      return SRC.heavyIntensityRain
    case (description === 'ragged shower rain'):
      return SRC.heavyIntensityRain
    case (description.includes('thunderstorm')):
      return SRC.thunderstorm
    case (description.includes('drizzle')):
      return SRC.lightRain
    case (description === 'light rain and snow'):
      return SRC.lightRainAndSnow
    case (description === 'rain and snow'):
      return SRC.lightRainAndSnow
    case (description.includes('snow')):
      return SRC.snow
    default:
      return SRC.clearDayIcon
  }
}

export const initMapFunctionString = ({ lat, lng }) => (
  `function initMap() {
    // The location base on our coordinates
    var center = { lat: ${lat}, lng: ${lng} };
    // The map, centered at our location
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: center,
      styles: ${JSON.stringify(getGoogleMapDarkStyles())},
    });
    // The marker, positioned at our location
    var marker = new google.maps.Marker({ position: center, map: map });
  }`
)

export const removeOldScriptElement = id => {
  const oldElemScript = document.getElementById(id)
  if (oldElemScript) {
    oldElemScript.remove()
  }
}


export const isMobile = () => {
  let isMobile = false

  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true
  }

  return isMobile
}

// export const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

// export const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key))





































