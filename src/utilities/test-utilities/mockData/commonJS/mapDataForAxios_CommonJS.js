const mapDataForAxios = {
  data: {
    type: 'FeatureCollection',
    query: [-121.9770887, 37.3118288],
    features: [
      {
        type: 'Feature',
        place_type: ['address'],
        text: 'Saratoga Avenue',
        place_name:
          '870 Saratoga Avenue, San Jose, California 95129, United States',
        center: [-121.9770887, 37.3118288],
      },
      {
        type: 'Feature',
        place_type: ['neighborhood'],
        text: 'West San Jose',
        place_name: 'West San Jose, San Jose, California 95129, United States',
        center: [-121.9770887, 37.3118288],
      },
      {
        type: 'Feature',
        place_type: ['postcode'],
        text: '95129',
        place_name: 'San Jose, California 95129, United States',
        center: [-121.9770887, 37.3118288],
      },
      {
        type: 'Feature',
        place_type: ['place'],
        text: 'San Jose',
        place_name: 'San Jose, California, United States',
        center: [-121.9770887, 37.3118288],
      },
      {
        place_type: ['region'],
        text: 'California',
        place_name: 'California, United States',
        center: [-121.9770887, 37.3118288],
      },
      {
        type: 'Feature',
        place_type: ['country'],
        text: 'United States',
        place_name: 'United States',
        center: [-121.9770887, 37.3118288],
      }
    ],
  }
}

module.exports = mapDataForAxios
