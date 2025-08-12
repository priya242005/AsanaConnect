import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <main>
        <h1>Welcome to the Yoga Instructor Application</h1>
        <p>
            Join our community of skilled yoga instructors and help others find their balance and wellness!
        </p>
        <Link to="/apply" href="/apply">
            Become a Yoga Instructor
        </Link>
        </main>
);
}

export default Home;
