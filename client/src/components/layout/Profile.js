import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/user';
import { getCurrentUserPhotos } from '../../actions/photo';

import ProfileInfo from './ProfileInfo';

const Profile = ({
  auth: { user },
  isAuthenticated,
  getCurrentProfile,
  getCurrentUserPhotos,
  user: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCurrentUserPhotos();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <h1>Welcome {user && user.name}</h1>
    

      {/* Show page depending if user has submitted profile info already */}
      {profile !== undefined ? (
        <ProfileInfo />
      ) : (
        <Fragment>
          <p>You dont have a profile yet!</p>
          <Link to='/create-my-profile'>Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentUserPhotos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getCurrentUserPhotos }
)(Profile);
