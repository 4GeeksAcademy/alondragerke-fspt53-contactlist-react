import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar mb-3">
			<Link to="/" className="logo d-flex align-items-center">
				<span className="material-symbols-outlined">
					diversity_2
				</span>					
				<span className="navbar-brand mb-0 ">Contacts</span>
			</Link>
		</nav>
	);
};
