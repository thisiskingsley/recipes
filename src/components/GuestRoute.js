//This route is just so logged-in users are unable to login/signup WHILE they're already logged in.

import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const GuestRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = localStorage.getItem('token');

	return (
		<Route
			{...rest}
			render={props => {
				if (!isAuthenticated) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/user',
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};



export default GuestRoute;
