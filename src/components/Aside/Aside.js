import React from 'react'

import GadgetContainer from 'components/common/GadgetContainer/GadgetContainer'
import Links from 'components/common/Links/Links'

import styles from './Aside.module.scss'

const Aside = () => (
  <GadgetContainer cardTitle='Links' className={styles.aside}>
    <Links />
  </GadgetContainer>
)

export default Aside
