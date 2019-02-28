import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/folders')
        }
    }

    render() {
        return (
            <div className="landing">
                <h1>WorkoutPlan</h1>
                <p>Keep track of your progress</p>
                <hr />
                <Link to="/folders">
                    Sign in
                </Link>
            </div>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {})(withRouter(Landing));