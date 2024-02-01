import React from "react";
import "/workspaces/alondragerke-fspt53-contactlist-react/src/styles/notfound.css"
import YogaImg from "/workspaces/alondragerke-fspt53-contactlist-react/src/img/yoga.png"
import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div className="page404">
            <img src={YogaImg} className="yoga404"/>
            <p className="message404">
                Oops! Looks like the balance is off here... <br></br>Let's find our center on another path.
            </p>
            <Link to="/"> 
					<button className="navbar-btn btn">Home</button>
			</Link>
        </div>
    );
};

export default NotFound;