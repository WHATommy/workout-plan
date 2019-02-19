import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav">
                    <div className="logoNav">
                        <Link to="/">
                            WorkoutPlan
                        </Link>
                    </div>
                    <div className="nonLogoNav">
                        <Link to="/login">
                            Login
                        </Link>
                        <Link to="/register">
                            Register
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar