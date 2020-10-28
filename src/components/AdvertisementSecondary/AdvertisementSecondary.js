import React from 'react'
import AddSecondaryItem from './AddSecondaryItem/AddSecondaryItem'

import imgTdd from 'assets/images/TDD-Secondary.jpg'
import imgSaga from 'assets/images/Redux-Saga.jpg'
import imgFunctional from 'assets/images/Functiona.jpg'

const AdvertisementSecondary = () => (
  <>
    <AddSecondaryItem img={imgTdd} />
    <AddSecondaryItem img={imgSaga} />
    <AddSecondaryItem img={imgFunctional} />
  </>
)

export default AdvertisementSecondary
