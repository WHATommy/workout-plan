import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';
import WorkoutReducer from './WorkoutReducer'
import FolderReducer from './FolderReducer';

export default combineReducers({
    auth: AuthReducer,
    errors: ErrorReducer,
    workoutLogs: WorkoutReducer,
    workoutFolders: FolderReducer
})