const mapData = {
  data: {
    type: 'FeatureCollection',
    query: [-121.9770887, 37.3118288],
    features: [
      {
        id: 'address.5758782240591712',
        type: 'Feature',
        place_type: ['address'],
        relevance: 1,
        properties: { accuracy: 'rooftop' },
        text: 'Saratoga Avenue',
        place_name:
          '870 Saratoga Avenue, San Jose, California 95129, United States',
        center: [-121.9765961, 37.3116579],
        geometry: { type: 'Point', coordinates: [-121.9765961, 37.3116579] },
        address: '870',
        context: [
          { id: 'neighborhood.33982', text: 'West San Jose' },
          { id: 'postcode.7699232404276190', text: '95129' },
          {
            id: 'place.7704339974165690',
            wikidata: 'Q16553',
            text: 'San Jose'
          },
          {
            id: 'region.9803118085738010',
            wikidata: 'Q99',
            short_code: 'US-CA',
            text: 'California'
          },
          {
            id: 'country.19678805456372290',
            wikidata: 'Q30',
            short_code: 'us',
            text: 'United States'
          }
        ]
      },
      {
        id: 'neighborhood.33982',
        type: 'Feature',
        place_type: ['neighborhood'],
        relevance: 1,
        properties: {},
        text: 'West San Jose',
        place_name: 'West San Jose, San Jose, California 95129, United States',
        bbox: [-122.035452, 37.266543, -121.940267, 37.33024],
        center: [-122.0106, 37.3026],
        geometry: { type: 'Point', coordinates: [-122.0106, 37.3026] },
        context: [
          { id: 'postcode.7699232404276190', text: '95129' },
          {
            id: 'place.7704339974165690',
            wikidata: 'Q16553',
            text: 'San Jose'
          },
          {
            id: 'region.9803118085738010',
            wikidata: 'Q99',
            short_code: 'US-CA',
            text: 'California'
          },
          {
            id: 'country.19678805456372290',
            wikidata: 'Q30',
            short_code: 'us',
            text: 'United States'
          }
        ]
      },
      {
        id: 'postcode.7699232404276190',
        type: 'Feature',
        place_type: ['postcode'],
        relevance: 1,
        properties: {},
        text: '95129',
        place_name: 'San Jose, California 95129, United States',
        bbox: [
          -122.035239002349,
          37.2894740932501,
          -121.968358074642,
          37.3231205699904
        ],
        center: [-121.98, 37.32],
        geometry: { type: 'Point', coordinates: [-121.98, 37.32] },
        context: [
          {
            id: 'place.7704339974165690',
            wikidata: 'Q16553',
            text: 'San Jose'
          },
          {
            id: 'region.9803118085738010',
            wikidata: 'Q99',
            short_code: 'US-CA',
            text: 'California'
          },
          {
            id: 'country.19678805456372290',
            wikidata: 'Q30',
            short_code: 'us',
            text: 'United States'
          }
        ]
      },
      {
        id: 'place.7704339974165690',
        type: 'Feature',
        place_type: ['place'],
        relevance: 1,
        properties: { wikidata: 'Q16553' },
        text: 'San Jose',
        place_name: 'San Jose, California, United States',
        bbox: [-122.035239010049, 37.111887004, -121.608866993, 37.484352971],
        center: [-121.8261, 37.2751],
        geometry: { type: 'Point', coordinates: [-121.8261, 37.2751] },
        context: [
          {
            id: 'region.9803118085738010',
            wikidata: 'Q99',
            short_code: 'US-CA',
            text: 'California'
          },
          {
            id: 'country.19678805456372290',
            wikidata: 'Q30',
            short_code: 'us',
            text: 'United States'
          }
        ]
      },
      {
        id: 'region.9803118085738010',
        type: 'Feature',
        place_type: ['region'],
        relevance: 1,
        properties: { wikidata: 'Q99', short_code: 'US-CA' },
        text: 'California',
        place_name: 'California, United States',
        bbox: [
          -124.514829293866,
          32.5019647016422,
          -114.131210004164,
          42.0095039998439
        ],
        center: [-119.699375153073, 37.0743595873],
        geometry: {
          type: 'Point',
          coordinates: [-119.699375153073, 37.0743595873]
        },
        context: [
          {
            id: 'country.19678805456372290',
            wikidata: 'Q30',
            short_code: 'us',
            text: 'United States'
          }
        ]
      },
      {
        id: 'country.19678805456372290',
        type: 'Feature',
        place_type: ['country'],
        relevance: 1,
        properties: { wikidata: 'Q30', short_code: 'us' },
        text: 'United States',
        place_name: 'United States',
        bbox: [-179.9, 18.8163608007951, -66.8847646185949, 71.4202919997506],
        center: [-97.9222112121185, 39.3812661305678],
        geometry: {
          type: 'Point',
          coordinates: [-97.9222112121185, 39.3812661305678]
        }
      }
    ],
    attribution:
      'NOTICE: © 2020 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.'
  }
}

module.exports = mapData
