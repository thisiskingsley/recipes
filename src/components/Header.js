// Called "Menu" in Semantic UI
import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

const Header = props => {
	if (props.auth.isAuthenticated && props.auth.token) {
		return (
			<div id="user-header" className="ui secondary huge menu">
				<Link to="/user" className="ui left floated item">
					<i className="fas fa-house-user fa-2x"></i>
					<div className="title">Recipes</div>
				</Link>

				<div className="ui welcome item">
					<h1>{`Welcome, ${props.user.username}!`}</h1>
				</div>
				<div className="ui right floated item">
					<Link onClick={props.logout} to="/" className="item">
						Log Out
					</Link>
				</div>
			</div> 
		);
	} else {
		return (
			<div id="guest-header" className="ui secondary pointing huge menu">
				<Link to="/" className="header item">
					<i className="fas fa-home fa-2x"></i>
					<div className="title">Recipes</div>
				</Link>
				<div className="right menu">
					<Link to="/signup" className="item">
						Sign Up
					</Link>
					<Link to="/login" className="item">
						Log In
					</Link>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => {
	return {
		auth: state.auth,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { logout })(Header);


