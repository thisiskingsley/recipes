import '../App.css';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/userActions';

const renderInput = ({ input, meta }) => {
	const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return <div className="error">{error}</div>;
		}
	};

	return (
		<>
			<div className={className}>
				<input
					{...input}
					autoComplete="off"
					placeholder="Enter Ingredients (Comma Separated)"
				/>
				<button className="ui button primary">Submit</button>
			</div>
			<div>{renderError(meta)}</div>
		</>
	);
};

const RecipeForm = props => {
	const onSubmit = formValues => {
		props.fetchRecipes(formValues.ingredients);
	};

	return (
		<div id="recipe-form">
			<form className="ui form" onSubmit={props.handleSubmit(onSubmit)}>
				<Field name="ingredients" component={renderInput} />
			</form>
		</div>
	);
};

const validate = formValues => {
	const errors = {};

	if (!formValues.ingredients) {
		errors.ingredients = 'Please Enter Ingredients';
	}
	return errors;
};

const formWrapped = reduxForm({
	form: 'recipeForm',
	validate,
})(RecipeForm);

export default connect(null, { fetchRecipes })(formWrapped);
