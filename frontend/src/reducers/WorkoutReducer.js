import { GET_WORKOUT } from '../actions/Types';

const initialState = {
    workoutLogs: [],
    errors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WORKOUT:
            return {
                ...state,
                workoutLogs: action.payload
            };
        default:
            return state;
    }
}