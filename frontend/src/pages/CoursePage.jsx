// src/pages/CoursePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CoursePage.css";

const CoursePage = () => {
  // Example problems list — replace with your real data source
  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Reverse Linked List", difficulty: "Medium" },
    { id: 3, title: "Word Ladder", difficulty: "Hard" },
  ];

  return (
    <div className="coursepage">
      <h1>Available Problems</h1>
      <table className="problems-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>{problem.title}</td>
              <td className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </td>
              <td>
                <Link to={`/problems/${problem.id}`} className="solve-btn">
                  Solve
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursePage;
