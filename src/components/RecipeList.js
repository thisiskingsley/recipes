import '../App.css';
import React from 'react';
import { connect } from 'react-redux';

const RecipeList = props => {
	if (props.recipes.length < 1) {
		return (
			<div id="no-recipes" className="ui center aligned container">
				<h1>Sorry, No Results. </h1>
				<h3>Please Go Back and Try Refining Your Search</h3>
			</div>
		);
	} else {
		const renderList = props.recipes.map(recipe => {
			const summary = recipe.summary.replace(/<[^>]+>/g, '');

			return (
				<div key={recipe.id} className="ui grid container padded">
					<div className="four wide column">
						<a href={recipe.spoonacularSourceUrl} target="_blank" rel="noreferrer">
							<img alt="food" className="ui large avatar image" src={recipe.image} />
						</a>
					</div>

					<div className="twelve wide column">
						<div className="ui header">
							<a href={recipe.spoonacularSourceUrl} target="_blank" rel="noreferrer">
								{recipe.title}
							</a>
						</div>
						<div className="">{summary}</div>
					</div>
				</div>
			);
		});

		return <div id="recipe-list">{renderList}</div>;
	}
};

const mapStateToProp = state => {
	return { recipes: state.recipes };
};

export default connect(mapStateToProp)(RecipeList);
