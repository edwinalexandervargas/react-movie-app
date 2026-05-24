import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true)
  const navigate = useNavigate();

  async function fetchMovies() {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`,
      );
      setMovie(data);

      const genre = data.Genre.split(",")[0].trim();
      const { data: similar } = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${genre}`,
      );
      if (similar.Search) setSimilarMovies(similar.Search.filter(m => m.imdbID !== id));
    } catch (err) {
    } finally {
      setLoading(false);
      setSimilarLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [id]);

  if (loading) return (
    <div className="bg-gradient-to-b from-blue-300 via-gray-300 to-slate-200 min-h-screen">
      <div className="flex p-10 gap-10 animate-pulse">
        <div className="w-64 h-96 bg-gray-300 rounded-lg flex-shrink-0"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-blue-300 via-gray-300 to-slate-200 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="m-10 text-3xl cursor-pointer hover:opacity-60 transition-all duration-300 text-blue-700"
      >
        ←
      </button>
      <div className="flex p-10 gap-10">
        <img src={movie.Poster} alt="" />
        <div className="flex flex-col gap-4 text-xl">
          <h1 className="text-4xl font-bold">
            {movie.Title} ({movie.Year})
          </h1>
          <p>
            <span className="font-bold">Plot: </span>
            {movie.Plot}
          </p>
          <p>
            <span className="font-bold">Director: </span>
            {movie.Director}
          </p>
          <p>
            <span className="font-bold">Actors: </span>
            {movie.Actors}
          </p>
          <p>
            <span className="font-bold">Genre: </span>
            {movie.Genre}
          </p>
          <p>
            <span className="font-bold">Rating: </span>
            {movie.imdbRating}/10
          </p>
          <p>
            <span className="font-bold">Runtime: </span>
            {movie.Runtime}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-2xl pt-10 text-center">More in this Genre</p>
        <div className="flex overflow-x-auto gap-4">
          {similarLoading ? (
    <div className='flex gap-4 px-4 animate-pulse'>
        {new Array(5).fill(0).map((_, index) => (
            <div key={index} className='flex-shrink-0 w-48'>
                <div className='w-full h-64 bg-gray-300 rounded-lg'></div>
                <div className='h-4 bg-gray-200 rounded mt-2 w-3/4'></div>
            </div>
        ))}
    </div>
) : ( similarMovies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              className="flex-shrink-0 w-48 cursor-pointer mt-4 hover:scale-105 transition-all duration-300"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 rounded-lg"
              />
              <p className="font-semibold mt-2">{movie.Title}</p>
            </div>
          ))
        )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;