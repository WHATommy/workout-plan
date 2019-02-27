import React, { Component } from 'react';
import { deleteFolder } from '../../../actions/FolderAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WorkoutFolderFormat extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
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

    render() {
        return (
            <div>
                <button>{this.props.name}</button>
                <button>Edit</button>
                <button onClick={this.onDeleteClick.bind(this, this.props.id)}>Delete</button>
            </div >
        )
    }
}

WorkoutFolderFormat.propTypes = {
    deleteFolder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { deleteFolder })(WorkoutFolderFormat)