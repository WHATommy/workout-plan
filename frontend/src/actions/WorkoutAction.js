import {
    GET_ERRORS,
    GET_WORKOUT
} from '../actions/Types';
import Axios from 'axios';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/AuthAction';
import jwt_decode from 'jwt-decode';

// Create workout log
export const createWorkout = (workout, id) => dispatch => {
    Axios
        .post(`http://localhost:5000/api/workout/workoutlog/${id}`, workout)
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
        .get(`http://localhost:5000/api/workout/workoutlog/${id}`)
        .then(res => {
            const folderId = res.data._id
            const workoutLogs = res.data.workoutFolderData.map(data => {
                return {
                    id: data._id,
                    name: data.name,
                    weight: data.weight,
                    reps: data.reps,
                    date: data.date
                };
            });

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
            .delete(`http://localhost:5000/api/workout/workoutlog/${folderId}/${logId}`)
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    };
};

// Edit workout log
export const editWorkout = (updatedLogs, folderId, logId) => dispatch => {
    Axios
        .put(`http://localhost:5000/api/workout/workoutlog/${folderId}/${logId}`, updatedLogs)
        .then(res => {
            alert('Edit successful')
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};