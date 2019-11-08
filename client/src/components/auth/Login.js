import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/auth';
import {Button, Form, Container} from 'react-bootstrap';

import styles from '../styles/landingStyles.module.css';

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
    <Container>
      <h2>Login</h2>
    <Form onSubmit={event => onSubmit(event)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  name='email' value={email}
            onChange={event => onChange(event)} required/>
        </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter Password" minLength='6' value={password}
            onChange={event => onChange(event)}/>
          </Form.Group>

          <Button variant="dark" type="submit">
            Login
          </Button>
      </Form>
    </Container>
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
