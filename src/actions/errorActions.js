// http://localhost:3001/api/recipes
// http://localhost:3001/api/users (for creating new users or pulling all users)
// http://localhost:3001/api/auth (for login authentication)
// http://localhost:3001/api/auth/user (for getting a specific user)
//Above are the paths to the db.json databases

import { GET_ERRORS, CLEAR_ERRORS } from './types';

//RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
	return {
		type: GET_ERRORS,
		payload: { msg, status, id },
	};
};

//CLEAR ERRORS
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
