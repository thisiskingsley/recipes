// http://localhost:3001/api/recipes
// http://localhost:3001/api/users (for creating new users or pulling all users)
// http://localhost:3001/api/auth (for login authentication)
// http://localhost:3001/api/auth/user (for getting a specific user)
//Above are the paths to the db.json databases

import axios from 'axios';
import { returnErrors } from './errorActions';
import history from '../history';

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
} from './types';

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING });

	//PASS IN TOKEN CONFIGURED AS JSON
	axios
		.get('/api/auth/user', tokenConfig(getState))
		.then(res =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

//LOGIN USER
export const login =
	({ username, password }) =>
	dispatch => {
		//HEADERS
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//REQUEST BODY
		const body = JSON.stringify({ username, password });

		axios
			.post('/api/auth', body, config)
			.then(res => {
				dispatch({ type: LOGIN_SUCCESS, payload: res.data });
				history.push('/user');
			})
			.catch(err => {
				dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
				dispatch({
					type: LOGIN_FAIL,
				});
			});
	};

//LOGOUT USER
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

//SETUP CONFIG/HEADERS AND TOKENS
export const tokenConfig = getState => {
	//GET TOKEN FROM LOCAL STORAGE
	const token = getState().auth.token;

	//HEADERS
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	// IF THERE'S A TOKEN, THEN ADD IT TO HEADERS
	if (token) {
		config.headers['x-auth-token'] = token;
	}

	return config;
};
