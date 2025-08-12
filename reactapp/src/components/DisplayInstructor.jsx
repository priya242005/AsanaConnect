import React, { useEffect, useState } from "react";

function DisplayInstructor() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("/getAllInstructors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);

  return (
    <div>
      <h2>Submitted Yoga Instructor Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Certification</th>
            <th>Yoga Specialty</th>
            <th>Class Preference</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((inst, idx) => (
            <tr key={idx}>
              <td>{inst.name}</td>
              <td>{inst.certification}</td>
              <td>{inst.yogaSpecialty}</td>
              <td>{inst.classPreference}</td>
              <td>{inst.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayInstructor;