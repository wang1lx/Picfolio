import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions/auth';
import {Button, Form, Row, Col} from 'react-bootstrap';
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
    <div className="custom-div">
      <h2>Login</h2>
    <Form onSubmit={event => onSubmit(event)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter email"  name='email' value={email}
            onChange={event => onChange(event)} required/>
        </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" name="password" placeholder="Enter Password" minLength='6' value={password}
            onChange={event => onChange(event)}/>
          </Form.Group>
          <Form.Group>
          <Row>
          <Col>
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
          <label class="form-check-label" >
            <p>Remember me </p>
          </label>
        </Col>
        <Col>
          <p><a href=''> Forgot your password?</a></p>
        </Col>
        </Row>
          </Form.Group>
          <Button className="custom-button" type="submit">
            Login
          </Button>
      </Form>
      <p>Not a member yet?<a href='/register'> Create your account </a></p>
      </div>
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
