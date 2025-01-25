
import React from "react"

export default function QuestionCard({ question }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-[1.02]">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">{question.title}</h2>
      <p className="text-sm text-gray-500 mb-3">Type: {question.type}</p>
      {question.type === "MCQ" && question.options && (
        <ul className="list-disc pl-5 space-y-2">
          {question.options.map((option, index) => (
            <li key={index} className={`${option.isCorrectAnswer ? "font-bold text-green-600" : "text-gray-700"}`}>
              {option.text}
            </li>
          ))}
        </ul>
      )}
      {question.type === "ANAGRAM" && question.blocks && (
        <div className="flex flex-wrap gap-2">
          {question.blocks.map((block, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">
              {block.text}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

