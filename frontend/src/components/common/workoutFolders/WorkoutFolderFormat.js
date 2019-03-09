import React, { Component } from 'react';
import { deleteFolder, editFolder } from '../../../actions/FolderAction';
import { getWorkout } from '../../../actions/WorkoutAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

class WorkoutFolderFormat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedFolder: '',
            edit: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const updatedFolder = {
            workoutFolderName: this.state.updatedFolder
        };
        this.props.editFolder(updatedFolder, this.props.id);
        this.setState({ edit: false });
    }

    onDeleteClick(id, event) {
        event.preventDefault();
        if (this.props.auth.isAuthenticated) {
            this.props.deleteFolder(id);
        } else {
            this.props.history.push('/login');
        }
    }

    onFolderClick(id, event) {
        event.preventDefault();
        if (this.props.auth.isAuthenticated) {
            this.props.getWorkout(id);
            this.props.history.push('/dashboard');
        } else {
            this.props.history.push('/login');
        }
    }

    onEditClick(e) {
        e.preventDefault();
        this.setState({ updatedFolder: this.props.name, edit: true });
    }

    onCancel(e) {
        e.preventDefault();
        this.setState({ edit: false });
    }

    render() {
        const edit = (
            <form onSubmit={this.onSubmit}>
                <input className="input" type='text' name='updatedFolder' value={this.state.updatedFolder} onChange={(e) => this.onChange(e)} />
                <button className="editButtonsOne" type='submit'>Submit</button>
                <button className="editButtonsTwo" onClick={this.onCancel.bind(this)}>Cancel</button>
            </form>
        )
        const nonEdit = (
            <>
                <div className="nameFolder">
                    {this.props.name}
                </div>
                <div className="buttonFolder">
                    <button className="go" onClick={this.onFolderClick.bind(this, this.props.id)}>Go</button>
                    <button className="edit" onClick={(e) => this.onEditClick(e)}>Edit</button>
                    <button className="delete" onClick={this.onDeleteClick.bind(this, this.props.id)}>Delete</button>
                </div>
            </>
        )
        return (
            <div className="containerFolder">
                {this.state.edit ? edit : nonEdit}
            </div>
        )
    }
}

WorkoutFolderFormat.propTypes = {
    deleteFolder: PropTypes.func.isRequired,
    getWorkout: PropTypes.func.isRequired,
    editFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { deleteFolder, getWorkout, editFolder })(withRouter(WorkoutFolderFormat))