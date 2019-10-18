import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    login(email, password);
  };

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }

  return (
    <Fragment>
      <form className='form' onSubmit={event => onSubmit(event)}>
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
        <input type='submit' value='Login' />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(
  mapStateToProps,
  { login }
)(Login);
