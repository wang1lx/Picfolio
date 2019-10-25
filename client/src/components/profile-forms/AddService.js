import React, { useState, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUserService } from '../../actions/user';

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
      <form className='form' onSubmit={event => onSubmit(event)}>
        <input
          type='text'
          placeholder='Service Name'
          value={name}
          onChange={event => onChange(event)}
          name='name'
        />
        <input
          type='text'
          placeholder='Enter a description for your service...'
          value={description}
          onChange={event => onChange(event)}
          name='description'
        />
        <input
          type='text'
          placeholder='Price'
          value={price}
          onChange={event => onChange(event)}
          name='price'
        />
        
        <input type='submit' value='Submit' />
      </form>
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
