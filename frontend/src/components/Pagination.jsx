
  import React from "react"

export default function Pagination({ currentPage, onPageChange }) {
  return (
    <div className="flex justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 transition duration-150 ease-in-out hover:bg-blue-600"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-200 rounded">{currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded transition duration-150 ease-in-out hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  )
}

