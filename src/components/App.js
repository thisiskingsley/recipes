import 'semantic-ui-css/semantic.min.css';
import React, { useEffect } from 'react';
import Header from './Header';
import HomePageGuest from './HomePageGuest';
import RecipesPage from './RecipesPage';
import SignUpPage from './SignUpPage';
import LogInModal from './LogInModal';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import HomePageUser from './HomePageUser';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';
import PageDoesNotExist from './PageDoesNotExist';

const App = props => {
	 const { loadUser } = props;
	
	useEffect(() => {
		loadUser();
	},[loadUser]);

	return (
		<div className="ui container">
			<Router history={history}>
				<Header />
				<Switch>
					<Route exact path="/" component={HomePageGuest} />

					<GuestRoute exact path="/login" component={LogInModal} />
					<GuestRoute exact path="/signup" component={SignUpPage} />

					<PrivateRoute exact path="/user" component={HomePageUser} />
					<PrivateRoute exact path="/recipes" component={RecipesPage} />

					<Route path="*" component={PageDoesNotExist} />
				</Switch>
			</Router>
		</div>
	);
};



export default connect(null, { loadUser })(App);
