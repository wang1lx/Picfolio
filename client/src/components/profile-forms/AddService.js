import React, { useState, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUserService } from '../../actions/user';
import {Form, Button} from 'react-bootstrap';
const AddService = ({ createUserService, history, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    createUserService(formData, history);
  };
  const { name, description, price } = formData;

  return (
    <Fragment>
    <div className="custom-div">
    <h2>Enter Service Information</h2>
    <Form onSubmit={event => onSubmit(event)}>
          <Form.Group controlId="formBasicName">
            <Form.Control type="text" placeholder="Enter Service Name"  name='name' value={name}
            onChange={event => onChange(event)} required/>
        </Form.Group>

          <Form.Group controlId="formBasicDes">
            <Form.Control type="text" name="description" placeholder="Enter a description for your service" value={description}
            onChange={event => onChange(event)}/>
          </Form.Group>

          <Form.Group controlId="formBasicPrice">
            <Form.Control type="number" name="price" placeholder="Enter price of your service" min="0" value={price}
            onChange={event => onChange(event)}/>
          </Form.Group>

          <Button className="custom-button" type="submit">
            Add Service
          </Button>
      </Form>
      </div>
    </Fragment>



  );
};

AddService.propTypes = {
  createUserService: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  { createUserService }
)(withRouter(AddService));
