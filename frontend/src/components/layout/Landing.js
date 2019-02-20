import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <h1>WorkoutPlan</h1>
                <p>Keep track of your progress</p>
                <hr />
                <Link to="/dashboard">
                    Sign in
                </Link>
            </div>
        )
    }
}

export default Landing;