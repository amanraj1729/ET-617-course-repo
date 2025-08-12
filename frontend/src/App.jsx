// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import CoursePage from "./pages/CoursePage";
// import VideoPlayer from "./pages/VideoPlayer";
// import Quiz from "./pages/Quiz";
// import ProtectedRoute from "./components/ProtectedRoute";
// import HomePage from "./pages/HomePage";
// import "./App.css";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/courses" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
//         <Route path="/videos" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
//         <Route path="/quizzes" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
//       </Routes>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import VideoPlayer from "./pages/VideoPlayer";
import Quiz from "./pages/Quiz";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
