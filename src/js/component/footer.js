import React, { Component } from "react";
import { FaHeart } from "react-icons/fa";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<p>
			Made with <FaHeart className="heart" /> by{" "}
			<a href="https://github.com/alondragerke" className="footer-name">Alondra Gerke</a>
		</p>
	</footer>
);
