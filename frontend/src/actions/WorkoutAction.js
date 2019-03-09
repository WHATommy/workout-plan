import {
    GET_ERRORS,
    GET_WORKOUT,
    DELETE_WORKOUT,
} from '../actions/Types';
import Axios from 'axios';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/AuthAction';
import jwt_decode from 'jwt-decode';

// Create workout log
export const createWorkout = (workout, id) => dispatch => {
    Axios
        .post(`/api/workout/workoutlog/${id}`, workout)
        .then(res => {
            let workoutLogs
            const folderId = id
            res.data.workoutFolders.map(folder => {
                if (folder._id == id) {
                    workoutLogs = folder.workoutFolderData.map(data => {
                        return {
                            id: data._id,
                            name: data.name,
                            weight: data.weight,
                            reps: data.reps,
                            date: data.date
                        };
                    });
                }
            })
            dispatch({
                type: GET_WORKOUT,
                payload: { workoutLogs, folderId }
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data
            })
        });
};

// Retrieve workout logs
export const getWorkout = id => dispatch => {
    // If page refresh, retrieve previous session
    if (localStorage.folderId) {
        id = localStorage.folderId
    };

    Axios
        .get(`/api/workout/workoutlog/${id}`)
        .then(res => {
            console.log(res.data)
            const folderId = res.data._id
            let workoutLogs = res.data.workoutFolderData.map(data => {
                return {
                    id: data._id,
                    name: data.name,
                    weight: data.weight,
                    reps: data.reps,
                    date: data.date
                };
            });
            console.log(workoutLogs)
            // Set current folderId into local storage
            localStorage.setItem('folderId', folderId);

            dispatch({
                type: GET_WORKOUT,
                payload: { workoutLogs, folderId }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response
            })
        );
}

// Delete workout log
export const deleteWorkout = (folderId, logId) => dispatch => {
    if (window.confirm("Delete log?")) {
        Axios
            .delete(`/api/workout/workoutlog/${folderId}/${logId}`)
            .then(dispatch({
                type: DELETE_WORKOUT,
                payload: { folderId, logId }

            }))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response
                })
            );
    };
};

// Edit workout log
export const editWorkout = (updatedLogs, folderId, logId) => dispatch => {
    Axios
        .put(`/api/workout/workoutlog/${folderId}/${logId}`, updatedLogs)
        .then(res => {
            dispatch(getWorkout(folderId))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
