import {
    GET_ERRORS,
    GET_FOLDER,
    CREATE_FOLDER,
    EDIT_FOLDER,
    DELETE_FOLDER
} from '../actions/Types';
import Axios from 'axios';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/AuthAction';
import jwt_decode from 'jwt-decode';

export const createFolder = (folder) => dispatch => {
    Axios
        .post('http://localhost:5000/api/workout/workoutfolder/', folder)
        .then(folder => {
            alert('Folder created!')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const getFolder = () => dispatch => {
    Axios
        .get('http://localhost:5000/api/workout/workoutfolder/')
        .then(folder => {
            const workoutFolder = folder.data[0].workoutFolders.map(data => {
                return {
                    id: data._id,
                    workoutFolderName: data.workoutFolderName
                }
            });
            dispatch({
                type: GET_FOLDER,
                payload: workoutFolder
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const deleteFolder = id => dispatch => {
    Axios
        .delete(`http://localhost:5000/api/workout/workoutfolder/${id}`)
        .then(res => {
            alert('Folder deleted')
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}
