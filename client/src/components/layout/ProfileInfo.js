import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileInfo = ({ profile }) => {
  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);

  return (
    <Fragment>
      <Link to='/edit-my-profile'>Edit Profile</Link>
      <Link to='/add-a-service'>Add a Service</Link>
      {profile !== null ? (
        <Fragment>
          {profile.location ? <p>{profile.location}</p> : null}
          {profile.bio ? <p>{profile.bio}</p> : null}
          {console.log(profile.social)}
          {console.log(profile.social['facebook'])}
          {profile.social 
            ? JSON.stringify(profile.social)
            : null}
          {profile.services 
            ? JSON.stringify(profile.services)
            : null}
        </Fragment>
      ) : (
        <p>Loading</p>
      )}
    </Fragment>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.user.profile
});

export default connect(
  mapStateToProps,
  {}
)(ProfileInfo);
