import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './LinkItem.module.scss'

const LinkItem = ({ icon, linkHref, linkText, linkLine1, linkLine2 }) => (
  <div className={styles.linkItem}>
    <FontAwesomeIcon icon={icon} />
    <a href={linkHref} target="_blank">{linkText}</a>
    <div>{linkLine1}</div>
    <div>{linkLine2}</div>
  </div>
)

export default LinkItem
