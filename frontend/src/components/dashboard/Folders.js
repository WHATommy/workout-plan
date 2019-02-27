import React, { Component } from 'react';
import WorkoutFolderMapping from '../common/workoutFolders/WorkoutFoldersMapping'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createFolder, getFolder } from '../../actions/FolderAction';


class Folders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workoutFolderName: '',
            workoutFolders: [],
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    jsonEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    componentDidUpdate() {
        const workoutFolder = this.props.workoutFolders.workoutFolders
        console.log(workoutFolder);
        if (!this.jsonEqual(workoutFolder, this.state.workoutFolders)) {
            this.setState({ workoutFolders: workoutFolder });
        };

    }

    componentDidMount() {
        this.props.getFolder();
        console.log(this.state.workoutFolders)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const folderInput = {
            workoutFolderName: this.state.workoutFolderName
        };
        this.props.createFolder(folderInput);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type='text' name='workoutFolderName' value={this.state.workoutFolderName} onChange={(e) => this.onChange(e)} placeholder="name" />
                    <button type='submit'>Submit</button>
                </form>
                <WorkoutFolderMapping workoutFolders={this.state.workoutFolders} />
            </div>
        )
    }
}

Folders.propTypes = {
    workoutFolders: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getFolder: PropTypes.func.isRequired,
    createFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    workoutFolders: state.workoutFolders,
    errors: state.errors
})

export default connect(mapStateToProps, { getFolder, createFolder })(Folders)