import React from 'react';
import styles from './SunMoon.module.scss';
import { SRC } from 'utilities/constants';

const MoonIcon = ({ sunRise, sunSet, baseMoveToLeft }) => (
  <div className={styles.sunMoonContainer}>
    <div className={styles.svgContainer}>
      <img src={SRC.clearNightIcon} alt="" />
    </div>
  </div>
);

export default MoonIcon;
