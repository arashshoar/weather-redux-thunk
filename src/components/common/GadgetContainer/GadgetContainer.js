import React from 'react'
import styles from './GadgetContainer.module.scss'

const GadgetContainer = ({ cardTitle, children, className }) => {
  return (
    <div className={`${styles.gadgetContainer} ${className}`}>
      <div className={styles.header}>
        {cardTitle}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default GadgetContainer
