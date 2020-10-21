import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faUsers, faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import styles from './Links.module.scss'

const Links = () => {

  return(
    <div className={styles.links}>
      <div className={styles.linkItem}>
        <FontAwesomeIcon icon={faAddressCard} />
        <a href="http://arashshoar.com/" target="_blank">Resume</a>
        <div>Portfolio</div>
        <div>CV</div>
      </div>
      <div className={styles.linkItem}>
        <FontAwesomeIcon icon={faGithub} />
        <a href="http://arashshoar.com/" target="_blank">Review</a>
        <div>React-Thunk</div>
        <div>Weather App</div>
      </div>
      <div className={styles.linkItem}>
        <FontAwesomeIcon icon={faUsers} />
        <a href="http://arashshoar.com/tasks/arash-shoar-apple-id/#/" target="_blank">User App</a>
        <div>Angular 1.5</div>
        <div>Apr 2017</div>
      </div>
      <div className={styles.linkItem}>
        <FontAwesomeIcon icon={faClipboardCheck} />
        <a href="http://arashshoar.com/tasks/arash-shoar-apple-id/#/signup" target="_blank">Form Validation</a>
        <div>Angular 1.5</div>
        <div>Apr 2017</div>
      </div>
      <div className={styles.linkItem}>
        <FontAwesomeIcon icon={faLinkedin} />
        <a href="https://www.linkedin.com/in/arash-shoar-439ab198" target="_blank">LinkedIn</a>
        <div>Profile</div>
        <div>More About Me</div>
      </div>
    </div>
  )
}

export default Links
