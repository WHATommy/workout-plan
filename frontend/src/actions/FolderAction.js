import {
    GET_ERRORS,
    GET_FOLDER,
} from '../actions/Types';
import Axios from 'axios';

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
            });
        });
};

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
};

export const deleteFolder = id => dispatch => {
    if (window.confirm("Delete log?")) {
        Axios
            .delete(`http://localhost:5000/api/workout/workoutfolder/${id}`)
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    };
};


export const editFolder = (updatedFolder, id) => dispatch => {
    Axios
        .put(`http://localhost:5000/api/workout/workoutfolder/${id}`, updatedFolder)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};