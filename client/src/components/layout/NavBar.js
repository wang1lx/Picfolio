import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Navbar, Nav } from 'react-bootstrap';
import styles from '../styles/navbarStyles.module.css'

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const onClickLogout = event => {
    event.preventDefault();
    logout();
  }

  const authLinks = (
    <div className={styles.nav_container}>
      <Nav className="ml-auto">
        <Nav.Link href="/" onClick={event => onClickLogout(event)}>
        Logout
        </Nav.Link>
      </Nav>
    </div>
  );

  const guestLinks = (
    <div className={styles.nav_container}>
      <Nav className="ml-auto">
        <Nav.Link href="/register">
        Register
        </Nav.Link>
        <Nav.Link href="/login">
        Login
        </Nav.Link>
      </Nav>
    </div>
  );

  return (
    <Navbar sticky="top" bg="light" variant="light">
      <Navbar.Brand href="/"><img width="340px" src="/picfolio_logo_text.png" className={styles.brand} alt="Picfolio logo"/></Navbar.Brand>
      {!loading && isAuthenticated ? authLinks : guestLinks}
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
