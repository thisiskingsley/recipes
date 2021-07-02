import _ from 'lodash';
import { FETCH_USERS } from '../actions/types';

export const usersReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_USERS:
			return { ...state, ..._.mapKeys(action.payload, 'username') };
		default:
			return state;
	}
};
