import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import QuestionList from "./components/QuestionList";
import TypeFilter from "./components/TypeFilter";
import Pagination from "./components/Pagination";

const App = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get query params safely
  const query = searchParams.get("query") || "";
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const type = searchParams.get("type") || "ALL";


  const [searchQuery, setSearchQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(page);
  const [selectedType, setSelectedType] = useState(type);

  useEffect(() => {
    setSearchQuery(query);
    setCurrentPage(page);
    setSelectedType(type);
  }, [query, page, type]);

  // Updates URL based on user interactions
  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, String(value));
      } else {
        newParams.delete(key);
      }
    });

    navigate(`?${newParams.toString()}`);
  };

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
    updateURL({ query: newQuery, page: 1, type: selectedType });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateURL({ query: searchQuery, page: newPage, type: selectedType });
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    setCurrentPage(1);
    updateURL({ query: searchQuery, page: 1, type: newType });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <main>
        <h1 className="text-4xl font-bold mb-8 text-center">Question Search</h1>
        <div className="mb-8">
          <SearchBox onSearch={handleSearch} initialQuery={searchQuery} />
        </div>
        <div className="mb-4">
          <TypeFilter
            onTypeChange={handleTypeChange}
            selectedType={selectedType}
          />
        </div>
        <QuestionList query={searchQuery} page={currentPage} type={selectedType} />
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </main>
    </div>
  );
};

export default App;