import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/landingStyles.module.css';

const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return (
      <Redirect to='/profile' />
    )
  }

  return (
    <div className={styles.first_page}>
    <div className={styles.body_container}>
      <div className={styles.main_title} >Showcase your work with Picfolio.</div>
      <div className={styles.exampleImageContainer}>
        <img width="400vw" src="/example_portfolio.png" alt="portfolio_profile" className={styles.shadow}/>
      </div>
      <div className={styles.subtitle}>Discover amazing phtographers and artists in your area</div>
    </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Landing);
