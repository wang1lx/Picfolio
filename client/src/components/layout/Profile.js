import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Profile = ({ isAuthenticated }) => {

    if (!isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    );
};

Profile.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Profile);