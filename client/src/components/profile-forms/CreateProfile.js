import React, { useState, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/user';

const CreateProfile = ({ createProfile, history, isAuthenticated }) => {
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

  return (
    <Fragment>
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
