import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';
import WorkoutReducer from './WorkoutReducer'

export default combineReducers({
    auth: AuthReducer,
    errors: ErrorReducer,
    workoutLogs: WorkoutReducer
})