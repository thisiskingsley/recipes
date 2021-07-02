// Login Form and Modal are here!
import '../App.css';
import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import Modal from './Modal';
import history from '../history';
import BackgroundImage from './BackgroundImage';

const renderInput = ({ input, label, meta, placeholder, type }) => {
	const className = `twelve wide field ${meta.error && meta.touched ? 'error' : ''}`;

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
					<input {...input} autoComplete="off" type={type} placeholder={placeholder} />
					<div
						className={` ${
							meta.error && meta.touched ? 'ui left pointing red basic label' : ''
						}`}
					>
						{renderError(meta)}
					</div>
				</div>
			</div>
		</>
	);
};

const renderActions = () => {
	return (
		<button form="login-form" className="ui button primary">
			Log In
		</button>
	);
};

const LogInForm = props => {
	const [msg, setMsg] = useState(null);

	//to display the specific error message from the backend
	useEffect(() => {
		if (props.err.id === 'LOGIN_FAIL') {
			setMsg(props.err.msg.msg);
		} else {
			setMsg(null);
		}
	}, [props.err.id, props.err.msg.msg]);

	const onSubmit = formValues => {
		const user = {
			username: formValues.username,
			password: formValues.password,
		};

		//Attempt to login
		props.login(user);
	};

	return (
		<form
			id="login-form"
			className="ui large form error"
			onSubmit={props.handleSubmit(onSubmit)}
		>
			{msg ? <div className="ui compact error message">{msg}</div> : null}
			<Field
				name="username"
				label="Username:"
				placeholder="Enter Username"
				type="text"
				component={renderInput}
			/>
			<Field
				name="password"
				label="Password:"
				placeholder="Enter Password"
				type="password"
				component={renderInput}
			/>
		</form>
	);
};

const LogInModal = props => {
	return (
		<div>
			<BackgroundImage />
			<Modal
				title="Please Log In"
				content={LogInForm(props)}
				actions={renderActions(props)}
				onDismiss={() => (history.push('/') & props.clearErrors())}
			/>
		</div>
	);
};

const validate = formValues => {
	const errors = {};

	if (!formValues.username) {
		errors.username = 'Please Enter Username';
	} else if (formValues.username.includes(' ')) {
		errors.username = 'No Spaces Please!';
	}

	if (!formValues.password) {
		errors.password = 'Please Enter Password';
	} else if (formValues.password.includes(' ')) {
		errors.password = 'No Spaces Please!';
	}

	return errors;
};

const mapStateToProps = state => {
	return {
		err: state.error,
	};
};

const formWrapped = reduxForm({
	form: 'LogInForm',
	validate,
})(LogInModal);

export default connect(mapStateToProps, { clearErrors, login })(formWrapped);
