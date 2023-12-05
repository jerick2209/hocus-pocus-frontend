import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { adId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [isAnswering, setIsAnswering] = useState(null);
  const [isAsking, setIsAsking] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://hocus-pocus-backend.onrender.com/ads/view/${adId}`
      );
      setProduct(response.data);
      setQuestions(response.data.questions || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  const handleAnswerQuestion = async (questionId) => {
    try {
      const response = await axios.put(
        `https://hocus-pocus-backend.onrender.com/ads/postAnswer/${adId}/${questionId}`,
        {
          answer: answerText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedQuestions = questions.map((q) =>
        q._id === questionId ? { ...q, answer: response.data } : q
      );

      setQuestions(updatedQuestions);
      setIsAnswering(null);
      setAnswerText(""); // Clear the answer text after posting
      window.location.reload()
    } catch (err) {
      setError("Failed to answer the question. Please try again.");
    }
  };
  const handleAskQuestion = async () => {
    try {
      const response = await axios.put(
        `https://hocus-pocus-backend.onrender.com/ads/postQuestion/${adId}`,
        {
          question: questionText,
        }
      );

      setQuestions([...questions, response.data]);
      setIsAsking(false);
      window.location.reload()
    } catch (err) {
      setError("Failed to ask the question. Please try again.");
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [adId]);

  return (
    <div className="container mt-5">
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        <div>
          <h2 className="display-4 fw-bold mb-4">{product.title}</h2>
          <p>{product.description}</p>
          <h3 className="mt-4">Questions and Answers</h3>
          {questions.map((question) => (
            <div key={question._id} className="mb-3">
              <p>Question: {question.text}</p>
              {question.answer ? (
                <div>
                    <p className="">Answer: {question.answer.text}</p>
                    <hr />
                    </div>
              ) : (
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsAnswering(question._id)}
                  >
                    Answer the question
                  </button>
                  {isAnswering === question._id && (
                    <div className="mt-3">
                      <textarea
                        className="form-control"
                        rows="3"
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        required
                      />
                      {error && <p className="text-danger">{error}</p>}
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleAnswerQuestion(question._id)}
                      >
                        Post Answer
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {!isAnswering && (
            <div className="mb-3">
              <button
                className="btn btn-primary"
                onClick={() => setIsAsking(true)}
              >
                Ask a question
              </button>
            </div>
          )}
          {isAsking && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion();
              }}
              className="mt-3"
            >
              <div className="mb-3">
                <label htmlFor="questionText" className="form-label">
                  Your Question:
                </label>
                <textarea
                  className="form-control"
                  id="questionText"
                  rows="3"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary">
                Post Question
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setIsAsking(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
