import React, { useState, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/user';

const EditProfile = ({ createProfile, history, isAuthenticated, profile }) => {  

  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  });

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    createProfile(formData, history);
  };
  const { bio, location, youtube, twitter, facebook, linkedin, instagram } = formData;

  const loadProfile = () => {  
    let profileData = {
      bio: profile.bio ? profile.bio : '',
      location: profile.location ? profile.location : '',
      ...profile.social
    }
    setFormData({...profileData});
  }

  return (
    <Fragment>
      <button onClick={loadProfile}>Load Current Profile</button>
      <form className='form' onSubmit={event => onSubmit(event)}>
        <input
          type='text'
          placeholder='location'
          value={location}
          onChange={event => onChange(event)}
          name='location'
        />
        <input
          type='text'
          placeholder='bio'
          value={bio}
          onChange={event => onChange(event)}
          name='bio'
        />
        <input
          type='text'
          placeholder='youtube'
          value={youtube}
          onChange={event => onChange(event)}
          name='youtube'
        />
        <input
          type='text'
          placeholder='twitter'
          value={twitter}
          onChange={event => onChange(event)}
          name='twitter'
          component='input'
        />
        <input
          type='text'
          placeholder='facebook'
          value={facebook}
          onChange={event => onChange(event)}
          name='facebook'
        />
        <input
          type='text'
          placeholder='linkedin'
          value={linkedin}
          onChange={event => onChange(event)}
          name='linkedin'
        />
        <input
          type='text'
          placeholder='instagram'
          value={instagram}
          onChange={event => onChange(event)}
          name='instagram'
        />
        <input type='submit' value='Submit' />
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.user.profile,
})


export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(EditProfile));
