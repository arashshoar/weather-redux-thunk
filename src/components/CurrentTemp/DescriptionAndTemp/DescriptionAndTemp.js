import React from 'react'
import { SRC } from 'utilities/constants'
import { getTemp } from 'utilities/utilities'
import UpArrowIcon from 'components/common/UpArrowIcon'
import DownArrowIcon from 'components/common/DownArrowIcon'

import styles from './DescriptionAndTemp.module.scss'

const DescriptionAndTemp = ({ description, maxTemp, minTemp, currentTemp, unitFC, setUnitFC }) => {

  React.useEffect(() => {
    if (unitFC) {
      window.localStorage.setItem('storedunitFC', unitFC)
    }

  }, [unitFC])

  return (
    <div className={styles.descriptionAndTemp}>
      <div className={styles.description}>
        <img src={SRC.clearDayIcon} alt=""/>
        <div>{description}</div>
      </div>
      <div>
        <UpArrowIcon/>
        <span>{getTemp(unitFC, maxTemp)}&deg;</span>
        <DownArrowIcon/>
        <span>{getTemp(unitFC, minTemp)}&deg;</span>
      </div>
      <div className={styles.tempAndUnits}>
        <div className={styles.temp}>{getTemp(unitFC, currentTemp)}&deg;</div>
        <div className={styles.units}>
          <div className={`${styles.celc} ${unitFC === 'f' && styles.notCurrent}`} onClick={() => unitFC === 'f' && setUnitFC('c')} >C</div>
          <div className={`${styles.faren} ${unitFC === 'c' && styles.notCurrent}`} onClick={() => unitFC === 'c' && setUnitFC('f')}>F</div>
        </div>
      </div>
    </div>
  )
}

export default DescriptionAndTemp
