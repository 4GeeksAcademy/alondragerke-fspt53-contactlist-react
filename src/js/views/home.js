import React, { useState } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="homepage d-flex flex-column align-items-center justify-content-center">
      <h1 className="title m-5">My contact list</h1>
      <Link to="/contacts">
					<button className="navbar-btn btn">Access</button>
			</Link>
    </div>
  )
};

export default Home;
