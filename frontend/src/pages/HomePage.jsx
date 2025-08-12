import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(loggedInUser);
  }, []);

  const handleStartSolving = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Welcome to CodeArena</h1>
        <p>Sharpen your coding skills with real challenges, anytime.</p>
        <button className="start-btn" onClick={handleStartSolving}>
          Start Solving
        </button>
      </div>
    </div>
  );
};

export default HomePage;
