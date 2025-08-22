import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
        <h2>Yoga Instructor Application</h2>
        <ul>
            <li>
            <Link to="/" href="/">Home</Link>
            </li>
            
        </ul>
        </nav>
);
}

export default NavBar;
