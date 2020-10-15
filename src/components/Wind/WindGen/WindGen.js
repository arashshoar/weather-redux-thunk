import React from 'react'
import { SRC } from 'utilities/constants'
import styles from './WindGen.module.scss'

const WindGen = ({ small }) => (
  <div className={`${styles.windGenContainer} ${small ? styles.small : null}`}>
    <img src={SRC.blade} alt={''} className={`${styles.blade} ${styles.rotate}`} />
    <img src={SRC.pole} alt={''} className={styles.pole} />
  </div>
)

export default WindGen
