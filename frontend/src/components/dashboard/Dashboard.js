import React, { Component } from 'react';
import WorkoutLogsFormat from '../common/WorkoutLogs/WorkoutLogsFormat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createWorkout } from '../../actions/WorkoutAction';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            workoutLogs: [],
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const workoutInput = {
            name: this.state.name,
            weight: parseInt(this.state.weight),
            reps: parseInt(this.state.reps)
        };
        this.props.createWorkout(workoutInput)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type='text' name='name' value={this.state.name} onChange={(e) => this.onChange(e)} placeholder="name"/>
                    <input type='text' name='weight' value={this.state.weight} onChange={(e) => this.onChange(e)} placeholder="weight"/>
                    <input type='text' name='reps' value={this.state.reps} onChange={(e) => this.onChange(e)} placeholder="reps"/>
                    <button type='submit'>Submit</button>
                </form>
                <div>
                    <WorkoutLogsFormat workoutLogs={this.state.workoutLogs} />
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    workoutLogs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    workoutLogs: state.workoutLogs,
    errors: state.errors
})

export default connect(mapStateToProps, { createWorkout })(Dashboard)