import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faUsers, faClipboardCheck} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import styles from './Links.module.scss'
import LinkItem from "../LinkItem/LinkItem";

const Links = () => {

  return(
    <div className={styles.links}>
      <LinkItem
        icon={faAddressCard}
        linkHref="http://arashshoar.com/"
        LinkText="Resume"
        linkLine1="Portfolio"
        linkLine2="Resume"
      />
      <LinkItem
        icon={faGithub}
        linkHref="https://github.com/arashshoar/weather-redux-thunk"
        LinkText="Review"
        linkLine1="React-Thunk"
        linkLine2="Weather App"
      />
      <LinkItem
        icon={faUsers}
        linkHref="http://arashshoar.com/tasks/arash-shoar-apple-id/#/"
        LinkText="User App"
        linkLine1="Angular 1.5"
        linkLine2="Apr 2017"
      />
      <LinkItem
        icon={faUsers}
        linkHref="http://arashshoar.com/tasks/arash-shoar-apple-id/#/signup"
        LinkText="Form Validation"
        linkLine1="Angular 1.5"
        linkLine2="Apr 2017"
      />
      <LinkItem
        icon={faLinkedin}
        linkHref="https://www.linkedin.com/in/arash-shoar-439ab198"
        LinkText="LinkedIn"
        linkLine1="Profile"
        linkLine2="More About Me"
      />
    </div>
  )
}

export default Links
