import React, { Component } from 'react';
import WorkoutFolderMapping from '../main/workoutFolders/WorkoutFoldersMapping'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createFolder, getFolder } from '../../actions/FolderAction';


class Folders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutFolderName: '',
            workoutFolders: [],
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
        const workoutFolder = this.props.workoutFolders.workoutFolders;
        if (!this.jsonEqual(workoutFolder, this.state.workoutFolders)) {
            this.setState({ workoutFolders: workoutFolder });
        };
    }

    componentDidMount() {
        if (this.props.auth) {
            this.props.getFolder();
        } else {
            this.props.history.push('/login');
        }

        localStorage.removeItem('folderId');
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const folderInput = {
            workoutFolderName: this.state.workoutFolderName
        };
        this.setState({ adding: false })
        this.props.createFolder(folderInput);
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
                <input className="input" type='text' name='workoutFolderName' value={this.state.workoutFolderName} onChange={(e) => this.onChange(e)} placeholder="Folder name" />
                <button className="submit" type='submit'>Submit</button>
                <button className="submit" onClick={this.onCancel.bind(this)}>Cancel</button>
            </form>
        )
        const nonAdding = (
            <div>
                <button onClick={(e) => this.onAddClick(e)} className="fas fa-plus addButton"></button>
            </div >
        )
        return (
            <div>
                <div className="centerFolder">
                    {this.state.adding ? adding : nonAdding}
                </div>
                <WorkoutFolderMapping workoutFolders={this.state.workoutFolders} />
            </div>
        )
    }
}

Folders.propTypes = {
    workoutFolders: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getFolder: PropTypes.func.isRequired,
    createFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    workoutFolders: state.workoutFolders,
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { getFolder, createFolder })(withRouter(Folders))