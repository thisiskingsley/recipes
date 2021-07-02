import "../App.css";
import React from "react";
import video from "../videos/pexels3.mp4";

const BackgroundVideo = () => {
	return (
		<video id="background" autoPlay muted>
			{/* <source src={video} type="video/mp4" /> */}
			<source src={video} />
		</video>
	);
};

export default BackgroundVideo;
