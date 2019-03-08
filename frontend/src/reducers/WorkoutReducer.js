import { GET_WORKOUT, CREATE_WORKOUT, DELETE_WORKOUT } from '../actions/Types';

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
        case DELETE_WORKOUT:
            return {
                ...state,
                workoutLogs: { workoutLogs: state.workoutLogs.workoutLogs.filter(workout => workout.id !== action.payload.logId) }
            };
        default:
            return state;
    }
}