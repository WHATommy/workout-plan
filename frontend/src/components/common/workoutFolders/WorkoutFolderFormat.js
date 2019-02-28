import React, { Component } from 'react';
import { deleteFolder } from '../../../actions/FolderAction';
import { getWorkout } from '../../../actions/WorkoutAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

class WorkoutFolderFormat extends Component {
    constructor(props) {
        super(props);
    }

    onDeleteClick(id, event) {
        event.preventDefault();
        console.log(this.props.id)
        if (this.props.auth.isAuthenticated) {
            this.props.deleteFolder(id)
        } else {
            this.props.history.push('/login')
        }
    }

    onFolderClick(id, event) {
        event.preventDefault();
        if (this.props.auth.isAuthenticated) {
            this.props.getWorkout(id)
            this.props.history.push('/dashboard')
        } else {
            this.props.history.push('/login')
        }
    }



    render() {
        return (
            <div>
                <button onClick={this.onFolderClick.bind(this, this.props.id)}>{this.props.name}</button>
                <button>Edit</button>
                <button onClick={this.onDeleteClick.bind(this, this.props.id)}>Delete</button>
            </div >
        )
    }
}

WorkoutFolderFormat.propTypes = {
    deleteFolder: PropTypes.func.isRequired,
    getWorkout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { deleteFolder, getWorkout })(withRouter(WorkoutFolderFormat))