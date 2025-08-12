import { motion } from "framer-motion";
import { useState } from "react";
import NavBar from "../components/NavBar";
import useClickLogger from "../components/ClickLogger";

export default function Quiz() {
  useClickLogger("Quiz");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const questions = [
    {
      id: 1,
      question: "What is React?",
      options: ["A JavaScript library for building user interfaces", "A programming language", "A database management system", "An operating system"],
      correct: 0,
      explanation: "React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications."
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 0,
      explanation: "useState is the primary hook used to add state to functional components in React."
    },
    {
      id: 3,
      question: "What is the purpose of useEffect hook?",
      options: ["To manage component state", "To handle side effects", "To create refs", "To optimize performance"],
      correct: 1,
      explanation: "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM."
    },
    {
      id: 4,
      question: "What is JSX?",
      options: ["A JavaScript extension", "A new programming language", "A database query language", "A CSS framework"],
      correct: 0,
      explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
    },
    {
      id: 5,
      question: "How do you pass data from parent to child component?",
      options: ["Using state", "Using props", "Using context", "Using refs"],
      correct: 1,
      explanation: "Props (properties) are used to pass data from parent components to child components in React."
    }
  ];

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent! You're a React expert! 🎉";
    if (score >= 60) return "Good job! Keep learning! 📚";
    return "Keep practicing! You'll get better! 💪";
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz Results 🎯</h1>
              
              <div className={`w-32 h-32 bg-gradient-to-r ${getScoreColor(score)} rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6`}>
                {score}%
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{getScoreMessage(score)}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                  <div className="text-sm text-blue-600">Total Questions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{questions.filter(q => selectedAnswers[q.id] === q.correct).length}</div>
                  <div className="text-sm text-green-600">Correct Answers</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-red-600">{questions.filter(q => selectedAnswers[q.id] !== q.correct).length}</div>
                  <div className="text-sm text-red-600">Incorrect Answers</div>
                </div>
              </div>

              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={q.id} className="text-left p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {index + 1}. {q.question}
                    </h3>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg ${
                            optIndex === q.correct
                              ? "bg-green-100 border border-green-300"
                              : optIndex === selectedAnswers[q.id] && optIndex !== q.correct
                              ? "bg-red-100 border border-red-300"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <span className={`font-medium ${
                            optIndex === q.correct
                              ? "text-green-700"
                              : optIndex === selectedAnswers[q.id] && optIndex !== q.correct
                              ? "text-red-700"
                              : "text-gray-700"
                          }`}>
                            {optIndex === q.correct ? "✅ " : optIndex === selectedAnswers[q.id] && optIndex !== q.correct ? "❌ " : ""}
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-3 italic">{q.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers({});
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200"
                >
                  Back to Courses
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            React Fundamentals Quiz 🧠
          </h1>
          <p className="text-lg text-gray-600">
            Test your knowledge with these interactive questions
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                ⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswers[questions[currentQuestion].id] === index
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">{option}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentQuestion === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
            }`}
          >
            ← Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Submit Quiz ✅
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Next →
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
