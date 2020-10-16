import React from 'react'
import styles from './SunMoon.module.scss'
import { SRC } from 'utilities/constants'

const SunLocation = ({ sunRise, sunSet, baseMoveToLeft }) => (
  <div className={styles.sunMoonContainer}>
    <div className={styles.svgContainer}>
      <svg className={styles.arcStroke} height="100" width="200">
        <circle
          cx="100"
          cy="100"
          r="99"
        />
      </svg>

      <svg
        style={{left: -200 + baseMoveToLeft}}
        className={styles.arcFill}
        height="100"
        width="200"
      >
        <circle
          cx={100 - baseMoveToLeft + 200}
          cy="100"
          r="99"
          strokeWidth="1"
        />
      </svg>

      <img
        src={SRC.clearDayIcon}
        alt=""
        className={styles.clearDayIcon}
        style={{
          left: baseMoveToLeft - 8,
          top: 92 - Math.sqrt(10000 - (100 - (200 - baseMoveToLeft)) ** 2)
        }}
      />

      <svg className={styles.dotLeft} height="6" width="6">
        <circle
          cx="3"
          cy="3"
          r="3"
        />
      </svg>

      <svg className={styles.dotRight} height="6" width="6">
        <circle
          cx="3"
          cy="3"
          r="3"
        />
      </svg>

      <div className={styles.sunRise}>{sunRise[0] === '0' ? sunRise.substr(1) : sunRise}</div>
      <div className={styles.sunSet}>{sunSet[0] === '0' ? sunSet.substr(1) : sunSet}</div>

    </div>
  </div>
)

export default SunLocation
