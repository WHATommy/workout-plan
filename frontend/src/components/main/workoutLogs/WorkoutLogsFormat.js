import React, { Component } from 'react';
import { editWorkout, deleteWorkout } from '../../../actions/WorkoutAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import Moment from 'moment'

class WorkoutLogsFormat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            weight: '',
            reps: '',
            edit: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    jsonEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const updatedLogs = {
            name: this.state.name,
            weight: `${this.state.weight}`,
            reps: `${this.state.reps}`
        };

        this.props.editWorkout(updatedLogs, this.props.folderId, this.props.id);
        this.setState({ edit: false })
    }

    onDeleteClick(id, event) {
        event.preventDefault();
        if (this.props.auth.isAuthenticated) {
            this.props.deleteWorkout(this.props.folderId, this.props.id)
        } else {
            this.props.history.push('/login')
        }
    }

    onEditClick(e) {
        e.preventDefault();
        this.setState({
            name: this.props.name,
            weight: this.props.weight,
            reps: this.props.reps,
            edit: true
        })
    }

    onCancel(e) {
        this.setState({ edit: false })
    }
    render() {
        let date = Moment(this.props.date).format("MMM-DD-YYYY")

        const edit = (
            <div className="workoutLogs">
                <form onSubmit={this.onSubmit}>
                    <input className="input" type='text' name='name' value={this.state.name} onChange={(e) => this.onChange(e)} />
                    <input className="input" type='text' name='weight' value={this.state.weight} onChange={(e) => this.onChange(e)} />
                    <input className="input" type='text' name='reps' value={this.state.reps} onChange={(e) => this.onChange(e)} />
                    <button className="edit" type='submit'>Submit</button>
                    <button className="delete" type='submit' onClick={this.onCancel.bind(this)}>Cancel</button>
                </form>
            </div>
        )
        const nonEdit = (
            <div className="workoutLogs">
                <h3>Name: {this.props.name}</h3>
                <p>Weight: {this.props.weight}</p>
                <p>Reps: {this.props.reps}</p>
                <p>Date: {date}</p>
                <button className="edit" onClick={(e) => this.onEditClick(e)}>Edit</button>
                <button className="delete" onClick={this.onDeleteClick.bind(this, this.props.id)}>Delete</button>
            </div>
        )
        return (
            <div>
                {this.state.edit ? edit : nonEdit}
            </div>
        )
    }
}

WorkoutLogsFormat.propTypes = {
    deleteWorkout: PropTypes.func.isRequired,
    editWorkout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { deleteWorkout, editWorkout })(withRouter(WorkoutLogsFormat))