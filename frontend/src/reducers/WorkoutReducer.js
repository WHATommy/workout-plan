import { GET_WORKOUT } from '../actions/Types';
import { isError } from 'util';

const initialState = {
    workout: [],
    errors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WORKOUT:
            return {
                ...state,
                workout: action.payload
            };
        default:
            return state;
    }
}