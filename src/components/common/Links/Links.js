import React from 'react'

import { faAddressCard, faUsers, faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import LinkItem from '../LinkItem/LinkItem'

import styles from './Links.module.scss'

const Links = () => {

  return(
    <div className={styles.links}>
      <LinkItem
        icon={faAddressCard}
        linkHref="http://arashshoar.com/"
        linkText="Resume"
        linkLine1="Portfolio"
        linkLine2="Resume"
      />
      <LinkItem
        icon={faGithub}
        linkHref="https://github.com/arashshoar/weather-redux-thunk"
        linkText="Review"
        linkLine1="React-Saga"
        linkLine2="Weather App"
      />
      <LinkItem
        icon={faGithub}
        linkHref="https://github.com/arashshoar/weather-redux-thunk/tree/redux-thunk"
        linkText="Review"
        linkLine1="React-Thunk"
        linkLine2="Weather App"
      />
      <LinkItem
        icon={faUsers}
        linkHref="http://arashshoar.com/tasks/arash-shoar-apple-id/#/"
        linkText="User App"
        linkLine1="Angular 1.5"
        linkLine2="Apr 2017"
      />
      <LinkItem
        icon={faClipboardCheck}
        linkHref="http://arashshoar.com/tasks/arash-shoar-apple-id/#/signup"
        linkText="Form Validation"
        linkLine1="Angular 1.5"
        linkLine2="Apr 2017"
      />
      <LinkItem
        icon={faLinkedin}
        linkHref="https://www.linkedin.com/in/arash-shoar-439ab198"
        linkText="LinkedIn"
        linkLine1="Profile"
        linkLine2="More About Me"
      />
    </div>
  )
}

export default Links
