import { GET_FOLDER } from '../actions/Types';

const initialState = {
    workoutFolders: [],
    errors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FOLDER:
            return {
                ...state,
                workoutFolders: action.payload
            };
        default:
            return state;
    }
} 