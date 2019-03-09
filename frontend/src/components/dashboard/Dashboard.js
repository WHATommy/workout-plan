import React, { Component } from 'react';
import WorkoutLogsMapping from '../common/workoutLogs/WorkoutLogsMapping';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createWorkout, getWorkout } from '../../actions/WorkoutAction';
import LineGraph from '../common/graph/LineGraph';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            weight: '',
            reps: '',
            workoutLogs: [],
            folderId: '',
            graphStatus: 'graphOne',
            adding: false,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    jsonEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    componentDidUpdate() {
        const workouts = this.props.workoutLogs.workoutLogs.workoutLogs
        const folderId = this.props.workoutLogs.workoutLogs.folderId
        if (!this.jsonEqual(workouts, this.state.workoutLogs)) {
            this.setState({ workoutLogs: workouts });
        };

        if (!this.jsonEqual(folderId, this.state.folderId)) {
            this.setState({ folderId: folderId });
        };
    }

    componentDidMount() {
        this.props.getWorkout();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onGraphClick(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const workoutInput = {
            name: this.state.name,
            weight: this.state.weight,
            reps: this.state.reps
        };
        this.setState({ adding: false })
        this.props.createWorkout(workoutInput, this.state.folderId);
    }

    onAddClick(e) {
        e.preventDefault();
        this.setState({
            adding: true
        })
    }

    onCancel(e) {
        this.setState({ adding: false })
    }

    render() {
        const adding = (
            <form className="form" onSubmit={this.onSubmit}>
                <input className="input" type='text' name='name' value={this.state.name} onChange={(e) => this.onChange(e)} placeholder="name" />
                <input className="input" type='text' name='weight' value={this.state.weight} onChange={(e) => this.onChange(e)} placeholder="weight" />
                <input className="input" type='text' name='reps' value={this.state.reps} onChange={(e) => this.onChange(e)} placeholder="reps" />
                <button className="dashboardButtonOne" type='submit'>Submit</button>
                <button className="dashboardButtonTwo" onClick={this.onCancel.bind(this)}>Cancel</button>
            </form>
        )
        const nonAdding = (
            <div>
                <button onClick={(e) => this.onAddClick(e)} className="fas fa-plus addButton"></button>
            </div >
        )
        return (
            <div>
                <div className="centerDashboard">
                    <div>
                        <LineGraph workoutData={this.state.workoutLogs} graphStatus={this.state.graphStatus} />
                    </div>
                    <div>
                        <button className="graphButton" onClick={(e) => this.onGraphClick(e)} value="graphOne" name="graphStatus">Line</button>
                        <button className="graphButton" onClick={(e) => this.onGraphClick(e)} value="graphTwo" name="graphStatus">Bar</button>
                    </div>
                    <div>
                        {this.state.adding ? adding : nonAdding}
                    </div>
                    <div>
                        <WorkoutLogsMapping workoutLogs={this.state.workoutLogs} folderId={this.state.folderId} />
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    workoutLogs: PropTypes.object.isRequired,
    errors: PropTypes.object,
    getWorkout: PropTypes.func.isRequired,
    createWorkout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    workoutLogs: state.workoutLogs,
    errors: state.errors
})

export default connect(mapStateToProps, { getWorkout, createWorkout })(Dashboard)