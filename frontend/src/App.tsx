import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import AddCity from './components/AddCity';
import CityData from './types/city.type';
import CityDataService from "./services/city.service";

const App: React.FC = () => {
  const [results, setResults] = useState<CityData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (query: string = '', page: number = 1) => {
    setIsLoading(true);
    try {
      const response = await CityDataService.searchCities(query, page);
      if (response.data.cities){
      setResults(response.data.cities);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setError(null);
      } else {
        setError('An error occurred while trying to find your city.');
      }
      } catch (e) {
      console.error(e);
      setError('An error occurred while fetching cities. Please try again later.');

      }finally {
        setIsLoading(false); // Stop loading
      }
  };

  useEffect(() => {
    handleSearch(searchQuery, currentPage); // Load initial cities
  }, [searchQuery, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>City Management</h1>
      <SearchForm onSearch={(query) => { setSearchQuery(query); setCurrentPage(1); }} />
      <AddCity onSearch={() => handleSearch(searchQuery)} />
      {error ? (
        <div className="error-message">{error}</div>
      ) : isLoading ?(
        <p>Loading...</p> 
      ):(
      <SearchResults
        results={results}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearch={() => handleSearch(searchQuery, currentPage)}
      />
    )}
    </div>
  );
};

export default App;
