import React from 'react'
import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'

import styles from './AddSecondaryItem.module.scss'

const AddSecondaryItem = ({ img }) => (
  <GadgetContainer cardTitle="Advertisement 2nd">
    <img src={img} alt='' className={styles.addImages} />
  </GadgetContainer>
)

export default AddSecondaryItem
