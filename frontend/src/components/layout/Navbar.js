import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/AuthAction';

class Navbar extends Component {
    onLogoutClick(event) {
        event.preventDefault();
        this.props.logoutUser();
        window.location = "/login"
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const authLinks = (
            <>
                <a href="" onClick={this.onLogoutClick.bind(this)}>Logout</a>
            </>
        );

        const guestLinks = (
            <>
                <Link to='/register'>Sign Up</Link>
                <Link to='/login'>Login</Link>
            </>
        );

        return (
            <div className="navbar">
                <div className="navbarLeft">
                    <Link to='/' className="navbarLogo">Workout</Link>
                </div>
                <div className="navbarRight">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,

})

export default connect(mapStateToProps, { logoutUser })(Navbar)