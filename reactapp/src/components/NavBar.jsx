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
            <li>
            <Link to="/getAllInstructors" href="/getAllInstructors">Instructor Details</Link>
            </li>
        </ul>
        </nav>
);
}

export default NavBar;
