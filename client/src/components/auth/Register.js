import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import {Button, Form} from 'react-bootstrap';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    passwordVerify: ''
  });

  const { username, name, email, password, passwordVerify } = formData;

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    if (password !== passwordVerify) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ username, name, email, password });
    }
  };

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Redirect to='/profile' />
  }

  return (
    <Fragment>
    <div className="custom-div ">
      <h2>Register</h2>
      <p>Enter Your Information to Create a Profile</p>
      <Form onSubmit={event => onSubmit(event)}>
        <Form.Group controlId="formName">

          <Form.Control type="text" placeholder="Enter Your Username" name='username' value={username}
            onChange={event => onChange(event)}/>
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Control type="text" placeholder="Enter Your Name" name='name' value={name}
            onChange={event => onChange(event)}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">

          <Form.Control type="email" placeholder="Enter email"  name='email' value={email}
          onChange={event => onChange(event)} required/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">

          <Form.Control type="password" name="password" placeholder="Enter Password" minLength='6' value={password}
          onChange={event => onChange(event)}/>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">

          <Form.Control name="passwordVerify" type="password" placeholder="Confirm Password" minLength='6'
          value={passwordVerify}  onChange={event => onChange(event)}/>
        </Form.Group>
        <Button className="custom-button" type="submit" >
          Register
        </Button>
      </Form>
        <p>Already have an account?<a href='/login'> Login </a></p>
</div>
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
