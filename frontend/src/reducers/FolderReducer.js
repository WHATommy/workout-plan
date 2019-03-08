import { GET_FOLDER, DELETE_FOLDER } from '../actions/Types';

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
        case DELETE_FOLDER:
            return {
                ...state,
                workoutFolders: state.workoutFolders.filter(folder => folder.id !== action.payload)
            }
        default:
            return state;
    }
} 