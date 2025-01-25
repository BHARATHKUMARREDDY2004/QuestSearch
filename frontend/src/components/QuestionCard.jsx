export default function QuestionCard({ question }) {

  console.log(question);
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
        <p className="text-sm text-gray-500 mb-2">Type: {question.type}</p>
        {question.type === "MCQ" && question.options && (
          <ul className="list-disc pl-5">
            {question.options.map((option, index) => (
              <li key={index} className={option.isCorrectAnswer ? "font-bold" : ""}>
                {option.text}
              </li>
            ))}
          </ul>
        )}
        {question.type === "ANAGRAM" && question.blocks && (
          <div className="flex space-x-2">
            {question.blocks.map((block, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                {block.text}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
  