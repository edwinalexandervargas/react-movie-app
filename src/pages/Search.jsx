import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  async function fetchMovies(query = searchValue, isUserSearch = false) {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`,
      );
      if (data.Search) {
        setMovies(data.Search);
        setError("");
        if (isUserSearch && query.trim()) {
          setHasSearched(true);
          setFilter("");
          const updatedHistory = [
            query,
            ...searchHistory.filter((term) => term !== query),
          ].slice(0, 5);
          setSearchHistory(updatedHistory);
          localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        }
      } else {
        setMovies([]);
        setError("No movies found. Try a different search.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const sortedMovies = () => {
    if (filter === "title") {
      return [...movies].sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === "year") {
      return [...movies].sort((a, b) => b.Year - a.Year);
    }
    return movies;
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(saved);
    fetchMovies("fast");
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-300 via-gray-300 to-slate-200 min-h-screen">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-6xl font-semibold mb-10">Browse our Movies</h1>
        <div className="relative w-full max-w-xl">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && fetchMovies(searchValue, true)
            }
            type="text"
            placeholder="Search for a movie"
            className="p-4 rounded-full w-full text-2xl text-center shadow-2xl"
          />
          <FontAwesomeIcon
            className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl cursor-pointer hover:text-blue-400 transition-all duration-300"
            icon={faMagnifyingGlass}
            onClick={() => fetchMovies(searchValue, true)}
          />
        </div>
        {searchHistory.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {searchHistory.map((term, index) => (
              <span
                key={index}
                onClick={() => fetchMovies(term, true)}
                className="bg-white px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition-all duration-300"
              >
                {term}
              </span>
            ))}
          </div>
        )}
        {error && (
          <p className="text-red-500 text-center text-xl mt-4">{error}</p>
        )}
      </div>
      {hasSearched && !loading && (
        <div className="flex justify-between px-4 mb-4">
          <h1 className="text-black font-semibold text-4xl">All Movies</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-60 rounded-lg pl-4"
          >
            <option value="">Sort By</option>
            <option value="title">A-Z</option>
            <option value="year">Newest Films</option>
          </select>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {new Array(6).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
              <div className="h-4 bg-gray-300 rounded mt-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded mt-2 w-1/4"></div>
            </div>
          ))}
        </div>
      ) : hasSearched ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {sortedMovies().map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              className="hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-lg"
              />
              <p className="text-gray-900 font-semibold mt-2">{movie.Title}</p>
              <p className="text-gray-700 text-sm">{movie.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-4 px-4 py-16 items-center">
          {sortedMovies().map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              className="flex-shrink-0 w-72 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-lg"
              />
              <p className="text-gray-900 font-semibold mt-2">{movie.Title}</p>
              <p className="text-gray-700 text-sm">{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
