import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import LandingInfo from '../common/landingInfo/LandingInfo';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/folders')
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Workout Plan</h1>
                    <hr></hr>
                    <p>Keep track of your progress</p>
                </div>
                <div>
                    <LandingInfo info='Log your sessions' />
                    <LandingInfo info='Keep all your logs in organized folders' />
                    <LandingInfo info='Visually see your progression' />
                </div>
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