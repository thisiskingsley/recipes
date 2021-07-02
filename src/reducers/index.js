import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { recipesReducer } from './recipesReducer';
import { usersReducer } from './usersReducer';

export default combineReducers({
	form: formReducer,
	recipes: recipesReducer,
	users: usersReducer,
	auth: authReducer,
	error: errorReducer,
});
