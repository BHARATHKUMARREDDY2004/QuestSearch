import React, { useState, useEffect, useCallback } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import SearchBox from "./components/SearchBox"
import QuestionList from "./components/QuestionList"
import TypeFilter from "./components/TypeFilter"
import Pagination from "./components/Pagination"
import Loader from "./components/Loader"
import debounce from "lodash/debounce"

const App = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const query = searchParams.get("query") || ""
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const type = searchParams.get("type") || "ALL"

  const [searchQuery, setSearchQuery] = useState(query)
  const [currentPage, setCurrentPage] = useState(page)
  const [selectedType, setSelectedType] = useState(type)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchQuery(query)
    setCurrentPage(page)
    setSelectedType(type)
  }, [query, page, type])

  const updateURL = useCallback(
    (params) => {
      const newParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })

      navigate(`?${newParams.toString()}`)
    },
    [navigate, searchParams],
  )

  const debouncedUpdateURL = useCallback(
    debounce((params) => updateURL(params), 300),
    [updateURL],
  )

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery)
    setCurrentPage(1)
    debouncedUpdateURL({ query: newQuery, page: 1, type: selectedType })
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    updateURL({ query: searchQuery, page: newPage, type: selectedType })
  }

  const handleTypeChange = (newType) => {
    setSelectedType(newType)
    setCurrentPage(1)
    updateURL({ query: searchQuery, page: 1, type: newType })
  }

  return (
    <div className="min-h-screen bg-gray-100 lg:px-40 scroll-smooth">
      <div className="container mx-auto px-4 py-8">
        <main>
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Question Search</h1>
          <div className="mb-8">
            <SearchBox onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
          <div className="mb-4">
            <TypeFilter onTypeChange={handleTypeChange} selectedType={selectedType} />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <QuestionList query={searchQuery} page={currentPage} type={selectedType} setLoading={setLoading} />
          )}
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
        </main>
      </div>
    </div>
  )
}

export default App

