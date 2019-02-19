import { GET_ERRORS, SET_CURRENT_USER } from './Types';
import Axios from 'axios';
import SetAuthToken from '../utils/SetAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
    Axios
        .post('/api/users/register', userData)
        .then(history.push('login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

// Login User
export const loginUser = (userData) => dispatch => {
    Axios
        .post('/api/users/login')
        .then(res => {
            // Save to local storage
            const { token } = res.data;

            // Set token to local storage
            localStorage.setItem('jwtToken', token);

            // Set token to  authe header
            SetAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};

// Set logged user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log out user
export const logoutUser = () => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    SetAuthToken(false);
    // Set current user to '{}' which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}