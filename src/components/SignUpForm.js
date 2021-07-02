import '../App.css';
import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUsers, fetchUsers } from '../actions/userActions';

const renderInput = ({ input, label, meta, placeholder, type }) => {
	const className = `twelve wide field ${
		meta.error && meta.touched ? 'error' : ''
	}`;

	const renderError = ({ touched, error }) => {
		if (touched && error) {
			return <div className="error">{error}</div>;
		}
	};

	return (
		<>
			<div className={className}>
				<div className="inline fields">
					<label className="label">{label}</label>
					<input
						{...input}
						autoComplete="off"
						type={type}
						placeholder={placeholder}
					/>
					<div
						className={` ${
							meta.error && meta.touched
								? 'ui left pointing red basic label'
								: ''
						}`}
					>
						{renderError(meta)}
					</div>
				</div>
			</div>
		</>
	);
};

const SignUpForm = props => {
	const { fetchUsers } = props;

	useEffect(() => {
		fetchUsers();
	},[fetchUsers]);

	const onSubmit = ({ username, password }) => {
		props.createUsers({ username, password });
	};

	return (
		<form
			id="signup-form"
			className="ui large form error"
			onSubmit={props.handleSubmit(onSubmit)}
		>
			<Field
				name="username"
				label="Username:"
				placeholder="Create A Username"
				type="text"
				component={renderInput}
			/>
			<Field
				name="password"
				label="Password:"
				placeholder="Create A Unique Password"
				type="password"
				component={renderInput}
			/>
			<Field
				name="confirmPassword"
				label="Confirm Password:"
				placeholder="Make Sure They Match"
				type="password"
				component={renderInput}
			/>
			<button className="ui button primary">Sign Up</button>
		</form>
	);
};

const validate = (formValues, props) => {
	const errors = {};

	if (!formValues.username) {
		errors.username = 'Please Enter Username';
	} else if (formValues.username.includes(' ')) {
		errors.username = 'No Spaces Please!';
	} else if (props.users.includes(formValues.username)) {
		errors.username = 'Sorry, username already taken!';
	}

	if (!formValues.password) {
		errors.password = 'Please Enter Password';
	} else if (formValues.password.includes(' ')) {
		errors.password = 'No Spaces Please!';
	}

	if (!formValues.confirmPassword) {
		errors.confirmPassword = 'Please Confirm Password';
	} else if (formValues.confirmPassword !== formValues.password) {
		errors.confirmPassword = 'Your Passwords Do Not Match';
	}

	return errors;
};

const mapStateToProps = state => {
	return { users: Object.keys(state.users) };
};

const formWrapped = reduxForm({
	form: 'SignUpForm',
	validate,
})(SignUpForm);

export default connect(mapStateToProps, { createUsers, fetchUsers })(
	formWrapped
);
