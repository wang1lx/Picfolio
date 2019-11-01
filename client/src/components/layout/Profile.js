import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Profile extends React.Component {
    state = {
      user: null
    }

    componentDidMount() {
      const { handle } = this.props.match.params;
      console.log(handle);
      fetch(`http://localhost:5000/api/users/profile/${handle}`)
      .then((user) => {
        this.setState(() => ({ user: user}))
      })
    }

    render() {
      return(
        <div>
          <h1>hello</h1>
        </div>
      );
    }
};

Profile.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(Profile);
