import {
    GET_ERRORS,
    GET_WORKOUT,
    CREATE_WORKOUT,
    EDIT_WORKOUT,
    DELETE_WORKOUT
} from '../actions/Types';
import Axios from 'axios';


export const createWorkout = (workout) => dispatch => {
    Axios
        .post('http://localhost:5050/api/workout/', workout)
        .then(res => {
            console.log(res);
            alert('Workout created!')
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.res.data
            })
        });
};

export const getWorkout = dispatch => {
    Axios
        .post('http://localhost:5050/api/workout/')
        .then(res => {
            const workoutLogs = res.data.map(data => {
                return {
                    name: data.name,
                    weight: data.weight,
                    reps: data.reps,
                    date: data.date
                }
            });
            dispatch({
                type: GET_WORKOUT,
                payload: workoutLogs
            })
        })
}