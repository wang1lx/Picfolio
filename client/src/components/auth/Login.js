import React, { Fragment, useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = event =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    console.log(formData);
  };

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

export default Login;
