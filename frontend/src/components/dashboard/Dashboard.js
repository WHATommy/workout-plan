import React, { Component } from 'react';
import WorkoutLogsMapping from '../common/WorkoutLogs/WorkoutLogsMapping';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createWorkout, getWorkout } from '../../actions/WorkoutAction';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            weight: '',
            reps: '',
            workoutLogs: [],
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    jsonEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    componentDidUpdate() {
        this.props.getWorkout();
        const workouts = this.props.workoutLogs.workoutLogs
        if (!this.jsonEqual(workouts, this.state.workoutLogs)) {
            this.setState({ workoutLogs: workouts });
        }
        console.log(this.state.workoutLogs.workoutLogs)
    }

    componentDidMount() {
        this.props.getWorkout();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const workoutInput = {
            name: this.state.name,
            weight: this.state.weight,
            reps: this.state.reps
        };
        this.props.createWorkout(workoutInput)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type='text' name='name' value={this.state.name} onChange={(e) => this.onChange(e)} placeholder="name" />
                    <input type='text' name='weight' value={this.state.weight} onChange={(e) => this.onChange(e)} placeholder="weight" />
                    <input type='text' name='reps' value={this.state.reps} onChange={(e) => this.onChange(e)} placeholder="reps" />
                    <button type='submit'>Submit</button>
                </form>
                <div>
                    <WorkoutLogsMapping workoutLogs={this.state.workoutLogs} />
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    workoutLogs: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getWorkout: PropTypes.func.isRequired,
    createWorkout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    workoutLogs: state.workoutLogs,
    errors: state.errors
})

export default connect(mapStateToProps, { getWorkout, createWorkout })(Dashboard)