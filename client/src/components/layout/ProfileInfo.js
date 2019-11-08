import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button, ButtonGroup} from 'react-bootstrap';

import UploadPhoto from '../profile-forms/UploadPhoto';
import PhotosDisplay from './PhotosDisplay';

const ProfileInfo = ({ profile }) => {
  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);

  return (
    <Fragment>


      {profile !== null ? (
        <Fragment>
          {profile.location ? <p>{profile.location}</p> : null}
          {profile.bio ? <p>{profile.bio}</p> : null}
          {profile.social
            ? JSON.stringify(profile.social)
            : null}
          {profile.services
            ? JSON.stringify(profile.services)
            : null}
        
          <UploadPhoto />

          <PhotosDisplay />

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
