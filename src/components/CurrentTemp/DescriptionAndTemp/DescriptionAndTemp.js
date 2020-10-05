import React from 'react'

import {SRC} from 'utilities/constants'
import UpArrowIcon from 'components/common/UpArrowIcon'
import DownArrowIcon from 'components/common/DownArrowIcon'

import styles from './DescriptionAndTemp.module.scss'

const DescriptionAndTemp = ({ description, maxTemp, minTemp, currentTemp }) => (
  <div className={styles.descriptionAndTemp}>
    <div className={styles.description}>
      <img src={SRC.clearDayIcon} alt=""/>
      <div>{description}</div>
    </div>
    <div>
      <UpArrowIcon/>
      <span>{Math.round(maxTemp)}&deg;</span>
      <DownArrowIcon/>
      <span>{Math.round(minTemp)}&deg;</span>
    </div>
    <div className={styles.tempAndUnits}>
      <div className={styles.temp}>{Math.round(currentTemp)}&deg;</div>
      <div className={styles.units}>
        <div className={styles.celc}>C</div>
        <div className={styles.faren}>F</div>
      </div>
    </div>
  </div>
)

export default DescriptionAndTemp
