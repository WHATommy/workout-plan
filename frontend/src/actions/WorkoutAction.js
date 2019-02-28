import {
    GET_ERRORS,
    GET_WORKOUT,
    CREATE_WORKOUT,
    EDIT_WORKOUT,
    DELETE_WORKOUT
} from '../actions/Types';
import Axios from 'axios';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser } from '../actions/AuthAction';
import jwt_decode from 'jwt-decode';

export const createWorkout = (workout, id) => dispatch => {
    console.log(workout)
    Axios
        .post(`http://localhost:5000/api/workout/workoutlog/${id}`, workout)
        .then(workout => {
            alert('Workout created!')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data
            })
        });
};

export const getWorkout = id => dispatch => {
    if (localStorage.folderId) {
        id = localStorage.folderId
    }
    Axios
        .get(`http://localhost:5000/api/workout/workoutlog/${id}`)
        .then(res => {
            console.log(res.data)
            const folderId = res.data._id
            const workoutLogs = res.data.workoutFolderData.map(data => {
                return {
                    name: data.name,
                    weight: data.weight,
                    reps: data.reps,
                    date: data.date
                }
            });

            localStorage.setItem('folderId', folderId);

            if (localStorage.jwtToken) {
                setAuthToken(localStorage.jwtToken)
                const decoded = jwt_decode(localStorage.jwtToken)
                store.dispatch(setCurrentUser(decoded));
            }

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