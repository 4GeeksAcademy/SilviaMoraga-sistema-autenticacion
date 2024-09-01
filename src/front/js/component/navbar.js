import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

function logOut(){
	localStorage.removeItem("jwt-token");
	navigate("/");
}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1"><i className="fa-solid fa-house" /></span>
				</Link>
				<button onClick={logOut} className="border border-0 bg-transparent">
					<i className="fa-solid fa-power-off fa-lg" />
				</button>
			</div>
		</nav>
	);
};
