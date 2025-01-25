export default function Pagination({ currentPage, onPageChange }) {
    return (
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded">{currentPage}</span>
        <button onClick={() => onPageChange(currentPage + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    )
  }
  