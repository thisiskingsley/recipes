import React, { useEffect } from 'react';
import image from '../images/EmptyFridge.jpeg';
import history from '../history';

const PageDoesNotExist = () => {
	useEffect(() => {
		const timer = setTimeout(() => {
			history.push('/user');
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<img id="background" alt="wall" className="ui fluid image" src={image} />
			<h1>Sorry, this page does not exist.</h1>
			<h2>Please select the Home button, or wait to be redirected in 5 seconds.</h2>
		</div>
	);
};

export default PageDoesNotExist;
