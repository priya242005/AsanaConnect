// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       / </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // implement as in earlier answer
import DisplayInstructor from "./components/DisplayInstructor";
import ApplyForm from "./components/ApplyForm";
import NavBar from "./components/NavBar"; // implement as in earlier answer
import Footer from "./components/Footer"; // implement as in earlier answer

function App() {
  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getAllInstructors" element={<DisplayInstructor />} />
          <Route path="/apply" element={<ApplyForm />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
