import React from 'react';
import { connect } from 'react-redux';
import { getUsersLocation } from 'actions/actions';

import styles from './App.module.scss';

const App = ({ getUsersLocation }) => {

  React.useEffect(() => {
    // getUsersLocation();
  });

  return (
    <div className={styles.app}>
      <div>In The Name of GOD</div>
      <img src='https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_100@2x.png' />
      <button onClick={getUsersLocation}>Fetch</button>
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    getUsersLocation: () => dispatch(getUsersLocation()),
  };
};

export default connect(null, mapDispatchToProps)(App);
