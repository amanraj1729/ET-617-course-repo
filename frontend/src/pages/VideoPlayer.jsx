import { motion } from "framer-motion";
import { useState } from "react";
import NavBar from "../components/NavBar";
import useClickLogger from "../components/ClickLogger";

export default function VideoPlayer() {
  useClickLogger("VideoPlayer");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoChapters = [
    { title: "Introduction", time: "0:00", duration: "2:30" },
    { title: "Getting Started", time: "2:30", duration: "5:45" },
    { title: "Core Concepts", time: "8:15", duration: "12:20" },
    { title: "Practical Examples", time: "20:35", duration: "8:45" },
    { title: "Summary", time: "29:20", duration: "3:10" }
  ];

  const relatedVideos = [
    { title: "Advanced JavaScript Concepts", duration: "15:30", thumbnail: "🔵", views: "2.4K" },
    { title: "React Hooks Deep Dive", duration: "18:45", thumbnail: "⚛️", views: "1.8K" },
    { title: "CSS Grid Layout", duration: "12:20", thumbnail: "🎨", views: "3.1K" }
  ];

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="relative">
                <video
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  controls
                  className="w-full h-96 object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {/* Custom Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        {isPlaying ? "⏸️" : "▶️"}
                      </button>
                      <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        🔉
                      </button>
                      <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        ⚙️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                JavaScript Fundamentals: Complete Beginner's Guide
              </h1>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>👁️ 12.5K views</span>
                  <span>📅 2 days ago</span>
                  <span>⭐ 4.8 (245 reviews)</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    👍 Like
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    💾 Save
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    📤 Share
                  </button>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Master the fundamentals of JavaScript programming with this comprehensive guide. 
                Learn variables, functions, objects, and more through practical examples and hands-on exercises.
              </p>
            </div>

            {/* Video Chapters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Chapters</h2>
              
              <div className="space-y-3">
                {videoChapters.map((chapter, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{chapter.title}</h3>
                        <p className="text-sm text-gray-600">{chapter.time} - {chapter.duration}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      ▶️
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Course Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Course Progress</h2>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Videos Completed</span>
                  <span className="font-medium text-gray-800">13/20</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quizzes Passed</span>
                  <span className="font-medium text-gray-800">8/12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time Spent</span>
                  <span className="font-medium text-gray-800">4h 32m</span>
                </div>
              </div>
            </div>

            {/* Related Videos */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Related Videos</h2>
              
              <div className="space-y-4">
                {relatedVideos.map((video, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{video.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.views} views</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
