import { useState } from "react";
import axios from "axios";
import { quizQuestions } from "../data/eqQuizQuestions";
import "@fontsource/red-hat-display";
import { useNavigate } from "react-router-dom";

export default function EQTest() {
  const questions = quizQuestions.domains.flatMap((d) => d.questions);
  const totalQuestions = questions.length;
  const pageSize = 5;
  const navigate = useNavigate();

  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));
  const [currentPage, setCurrentPage] = useState(0);

  const handleAnswer = (value, index) => {
    const newAns = [...answers];
    newAns[index] = value;
    setAnswers(newAns);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalQuestions / pageSize) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const submit = async () => {
    if (answers.some((a) => a === null)) {
      alert("⚠️ Please answer all questions before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/eq/submit",
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Save results for Dashboard & Exercises
      localStorage.setItem("eqResult", JSON.stringify(res.data));

      // Redirect to exercises
      navigate("/exercises");
    } catch (err) {
      console.error("Error submitting EQ test:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const startIndex = currentPage * pageSize;
  const currentQuestions = questions.slice(startIndex, startIndex + pageSize);

  // Circle sizes + colors
  const circleSizes = [40, 32, 24, 32, 40]; // outer big, neutral small
  const colors = ["#f56565", "#f6e05e", "#E2E8F0", "#9ae6b4", "#48bb78"];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h2
          className="text-2xl font-bold mb-8 text-center"
          style={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontSize: "28px",
          }}
        >
          Emotional Intelligence Test
        </h2>

        {currentQuestions.map((q, i) => {
          const index = startIndex + i;
          return (
            <div
              key={index}
              className="mb-8 text-center p-4 border-b border-gray-300"
            >
              <p
                className="mb-6 text-xl"
                style={{ fontFamily: "'Red Hat Display', sans-serif" }}
              >
                {q}
              </p>
              <div className="flex justify-center items-center gap-4">
                <span className="text-sm w-28 text-left">
                  Strongly Disagree
                </span>
                {[1, 2, 3, 4, 5].map((val, idx) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(val, index)}
                    className="rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
                    style={{
                      width: circleSizes[idx],
                      height: circleSizes[idx],
                      backgroundColor:
                        answers[index] === val
                          ? colors[idx]
                          : colors[idx] + "66",
                      color: answers[index] === val ? "white" : "black",
                    }}
                    title={quizQuestions.scoring[val]}
                  ></button>
                ))}
                <span className="text-sm w-28 text-right">Strongly Agree</span>
              </div>
            </div>
          );
        })}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition disabled:opacity-50"
          >
            Previous
          </button>
          {currentPage === Math.ceil(totalQuestions / pageSize) - 1 ? (
            <button
              onClick={submit}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={nextPage}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              Next
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-gray-500">
          {`Page ${currentPage + 1} of ${Math.ceil(totalQuestions / pageSize)}`}
        </p>
      </div>
    </div>
  );
}
