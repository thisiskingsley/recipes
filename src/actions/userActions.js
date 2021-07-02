// http://localhost:3001/api/recipes
// http://localhost:3001/api/users (for creating new users or pulling all users)
// http://localhost:3001/api/auth (for login authentication)
//Above are the paths to the db.json databases

//left off trying to figure out how to properly hide API key in .env file

import axios from 'axios';
import history from '../history';
import { returnErrors } from './errorActions';
import { FETCH_RECIPES, FETCH_USERS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const fetchRecipes = formValues => async dispatch => {
	const response = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`,
		{
			params: {
				includeIngredients: formValues,
				number: 10,
				addRecipeInformation: true,
			},
		}
	);

	dispatch({ type: FETCH_RECIPES, payload: response.data.results });

	history.push('/recipes');
};

export const createUsers =
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
			.post('/api/users', body, config)
			.then(res => {
				// sent to the authReducer
				dispatch({ type: REGISTER_SUCCESS, payload: res.data });
				history.push('/user');
			})
			.catch(err => {
				dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
				dispatch({
					type: REGISTER_FAIL,
				});
			});

		history.push('/user');
	};

export const fetchUsers = () => async dispatch => {
	const response = await axios.get('/api/users');

	dispatch({ type: FETCH_USERS, payload: response.data });
};
