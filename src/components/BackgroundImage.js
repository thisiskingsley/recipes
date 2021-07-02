import "../App.css";
import React from "react";
import image from "../images/MassiveBackground.png";

const BackgroundImage = () => {
	return (
		<img
			id="background"
			alt="wall"
			className="ui fluid image"
			src={image}
		/>
	);
};

export default BackgroundImage;
