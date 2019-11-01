import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return (
      <Redirect to='/profile' />
    )
  }

  return (
    <div>

      <h1 >Welcome to Picfolio!</h1>
      <p>We know you've got the skills so why not show off what you have? Register now and let the world see through your lens.</p>
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
