import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {Button, Navbar, Nav, ButtonGroup} from 'react-bootstrap';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const onClickLogout = event => {
    event.preventDefault();
    logout();
  }

  const authLinks = (

<ul className="navbar-nav mr-auto">
   <li className="nav-item nav-link">
      <a className="nav-text" onClick={event => onClickLogout(event)}  href='/'>
        Logout
      </a>
  </li>
</ul>

  );

  const guestLinks = (

<ul className="navbar-nav mr-auto"  >
   <li className="nav-link"  >
      <a  href='/register' className="nav-text">
        Register
      </a>
  </li>
   <li className="nav-link" >
      <a  className="nav-text" href='/login'>
        Login
      </a>
  </li>

</ul>



  );
  return (

    <Navbar className="nav-color" expand="lg"  sticky="top" variant="light">
      <Navbar.Brand href="/"><img height="80" width="150" src="/picfolio_logo.png" className="d-inline-block align-top" alt="Picfolio logo"/></Navbar.Brand>
      <Nav className="ml-auto" >
           {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
      </Nav>
    </Navbar>

  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
