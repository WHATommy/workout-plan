import { SET_CURRENT_USER } from '../actions/Types';
import isEmpty from '../validation/Is-Empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload)
            };
        default:
            return state;
    }
}