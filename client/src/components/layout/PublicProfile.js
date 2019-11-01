import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getViewProfile } from '../../actions/view'

const PublicProfile = ({ view: { viewUser, loading, error }, match: { params }, getViewProfile}) => {
    useEffect(() => {
        getViewProfile(params.handle);
    }, [loading]);

    if(viewUser !== null) {
        return(
            <div> 
                <h1>Welcome to <i>{viewUser.name}</i>'s profile!</h1>
            </div>
        );
    } else if (error !== null) {
        return(
            <h1>User was not found</h1>
        )
    }
    else {
        return(
            <h1>loading...</h1>
        )
    }
}

PublicProfile.propTypes = {
    getViewProfile: PropTypes.func.isRequired,
    view: PropTypes.object
}

const mapStateToProps = state => ({
    view: state.view,
})

export default connect(mapStateToProps, { getViewProfile })(PublicProfile);
