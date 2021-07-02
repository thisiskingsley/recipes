import React, { useState, useEffect } from 'react';
import BackgroundVideo from './BackgroundVideo';
import { Transition } from 'semantic-ui-react';

const HomePageGuest = () => {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<div>
			<BackgroundVideo />
			<Transition visible={visible} animation="scale" duration={2000}>
				<div id="recipe-summary" className="ui basic segment center aligned">
					<h2>
						Welcome to Recipes! <br />
						Ever wonder what you could make with the ingredients you have in your
						kitchen? <br />
						Well, once you sign up or log in, you can search for recipes by just
						entering a few ingredients! <br />
						Go ahead, give it a try!
					</h2>
				</div>
			</Transition>
		</div>
	);
};

export default HomePageGuest;
