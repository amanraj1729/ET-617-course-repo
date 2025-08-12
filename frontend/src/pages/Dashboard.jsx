import { motion } from "framer-motion";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import useClickLogger from "../components/ClickLogger";
import { logPageView } from "../components/ClickLogger";

export default function Dashboard() {
  useClickLogger("Dashboard");

  // Log page view when component mounts
  useEffect(() => {
    logPageView("Dashboard", { 
      user: JSON.parse(localStorage.getItem("user") || "{}").username 
    });
  }, []);

  const stats = [
    { label: "Courses Completed", value: "12", icon: "🎓", color: "from-blue-500 to-blue-600" },
    { label: "Videos Watched", value: "48", icon: "📺", color: "from-purple-500 to-purple-600" },
    { label: "Quizzes Taken", value: "24", icon: "🧠", color: "from-green-500 to-green-600" },
    { label: "Hours Learned", value: "36", icon: "⏰", color: "from-orange-500 to-orange-600" }
  ];

  const recentCourses = [
    { title: "JavaScript Fundamentals", progress: 75, category: "Programming", image: "🔵" },
    { title: "Data Science Basics", progress: 45, category: "Data Science", image: "🟣" },
    { title: "Web Development", progress: 90, category: "Programming", image: "🔵" }
  ];

  const upcomingQuizzes = [
    { title: "JavaScript Quiz", date: "Tomorrow", difficulty: "Medium" },
    { title: "Data Science Quiz", date: "Next Week", difficulty: "Hard" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Continue your learning journey from where you left off
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Courses</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-2xl">
                      {course.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600 mb-1">{course.progress}%</div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Quizzes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Quizzes</h2>
              
              <div className="space-y-4">
                {upcomingQuizzes.map((quiz, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">{quiz.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{quiz.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        quiz.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                        quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                Start Learning
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Browse Courses", icon: "📚", color: "from-blue-500 to-blue-600", path: "/courses" },
                { title: "Watch Videos", icon: "🎥", color: "from-purple-500 to-purple-600", path: "/videos" },
                { title: "Take Quiz", icon: "🧠", color: "from-green-500 to-green-600", path: "/quizzes" }
              ].map((action, index) => (
                <motion.button
                  key={index}
                  className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 text-left"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800">{action.title}</h3>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
