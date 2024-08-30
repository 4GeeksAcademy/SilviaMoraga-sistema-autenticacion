import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><i className="fa-solid fa-house" /></span>
				</Link>
				<button className="">
					<i className="fa-solid fa-power-off fa-lg" />
				</button>
			</div>
		</nav>
	);
};
