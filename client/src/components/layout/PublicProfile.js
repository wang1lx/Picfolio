import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getViewProfile } from '../../actions/view'

const PublicProfile = ({ view: { viewUser }, match: { params }, getViewProfile}) => {
    useEffect(() => {
        getViewProfile(params.handle);
        console.log(viewUser);
    }, []);

    return(
        <div> 
            <h1>heyy</h1>
        </div>
    );
}

PublicProfile.propTypes = {
    getViewProfile: PropTypes.func.isRequired,
    view: PropTypes.object
}

const mapStateToProps = state => ({
    view: state.view,
})

export default connect(mapStateToProps, { getViewProfile })(PublicProfile);
