import { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Loader from "./Loader";

function QuestionList({ query, page, type }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                type: type,
                page: page
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [query, page, type]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (questions.length === 0) return <div className="text-gray-600">No questions found</div>;

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="opacity-0 translate-y-4 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <QuestionCard question={question} />
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
