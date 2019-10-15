import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordVerify: ''
  });

  const { name, email, password, passwordVerify } = formData;

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    if (password !== passwordVerify) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return (
    <Fragment>
      <form className='form' onSubmit={event => onSubmit(event)}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={event => onChange(event)}
          required
        />
        <input
          type='email'
          placeholder='Email Address'
          value={email}
          onChange={event => onChange(event)}
          name='email'
          required
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          minLength='6'
          value={password}
          onChange={event => onChange(event)}
          required
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='passwordVerify'
          minLength='6'
          value={passwordVerify}
          onChange={event => onChange(event)}
          required
        />
        <input type='submit' value='Register' />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
