import React from "react"

const questionTypes = ["ALL", "READ_ALONG", "MCQ", "ANAGRAM", "CONTENT_ONLY", "CONVERSATION"]

function TypeFilter({ onTypeChange, selectedType }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="font-semibold text-gray-700">Filter by type:</span>
      {questionTypes.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-3 py-1 rounded-full text-sm transition duration-150 ease-in-out ${
            selectedType === type ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  )
}

export default TypeFilter

