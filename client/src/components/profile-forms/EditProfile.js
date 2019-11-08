import React, { useState, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/user';
import {Button, Form} from 'react-bootstrap';
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
    <div className="custom-div">
    <h2>Edit Profile Info</h2>
      <Button className="populate-btn" onClick={loadProfile}>
        Auto Populate
      </Button>
      <Form onSubmit={event => onSubmit(event)}>
            <Form.Group controlId="formLocation">
              <Form.Control type="text" placeholder="Enter location"  name='location' value={location}
              onChange={event => onChange(event)} required/>
              </Form.Group>

            <Form.Group controlId="formBio">
              <Form.Control type="text" name="bio" placeholder="Enter bio" value={bio}
              onChange={event => onChange(event)}/>
            </Form.Group>

            <Form.Group controlId="formYoutube">
              <Form.Control type="text" name="youtube" placeholder="Enter youtube link" value={youtube}
              onChange={event => onChange(event)}/>
            </Form.Group>

            <Form.Group controlId="formTwitter">
              <Form.Control type="text" name="twitter" placeholder="Enter twitter link" value={twitter}
              onChange={event => onChange(event)}/>
            </Form.Group>

            <Form.Group controlId="formFacebook">
              <Form.Control type="text" name="facebook" placeholder="Enter facebook link" value={facebook}
              onChange={event => onChange(event)}/>
            </Form.Group>

            <Form.Group controlId="formLinkedin">
              <Form.Control type="text" name="linkedin" placeholder="Enter LinkedIn link" value={linkedin}
              onChange={event => onChange(event)}/>
            </Form.Group>

            <Form.Group controlId="formInstagram">
              <Form.Control type="text" name="linkedin" placeholder="Enter Instagram link" value={instagram}
              onChange={event => onChange(event)}/>
            </Form.Group>

            <Button className="custom-button" type="submit">
              Save
            </Button>
        </Form>
        </div>
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
