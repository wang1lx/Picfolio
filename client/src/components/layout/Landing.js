import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return (
      <Redirect to='/profile' />
    )
  }

  return (
    <div>
      <h1>Welcome to the landing page! Nothing here yet...</h1>
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