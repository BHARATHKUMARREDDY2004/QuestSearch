import React from "react";

const questionTypes = ["ALL", "READ_ALONG", "MCQ", "ANAGRAM", "CONTENT_ONLY", "CONVERSATION"];

function TypeFilter({ onTypeChange, selectedType }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-semibold">Filter by type:</span>
      {questionTypes.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-3 py-1 rounded ${selectedType === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;