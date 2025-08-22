import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Home.css';
import logo from "./logo.png";
import Footer from "./Footer";

function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flexGrow: 1 }}>
        <main className="asana-home">
          <div className="overlay" />
          <div className="content">
            <img src={logo} alt="AsanaConnect Logo" className="asana-logo" />
            <h1 className={visible ? "main-title show" : "main-title"}>
  Welcome<br />
  to<br />
  <span className="brand-name">AsanaConnect</span>
</h1>

            <p className={visible ? "main-desc show" : "main-desc"}>
              Join our community of skilled yoga instructors and passionate learners.<br />
              Find your balance, improve your wellness, and connect through yoga sessions tailored for you.
            </p>
            <div className="button-group">
              <Link to="/apply" className="asana-btn">Become a Yoga Instructor</Link>
              <Link to="/login" className="asana-btn">Instructor Login</Link>
              <Link to="/user/login" className="asana-btn">User Login</Link>
              <Link to="/admin/login" className="asana-btn">Admin Login</Link>
            </div>
          </div>
        </main>
      </div>
     <Footer/>
    </div>
  );
}

export default Home;
