import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-300 to-slate-200 h-screen flex flex-col items-center justify-center">
      <h1 className="text-slate-800 text-4xl md:text-6xl font-bold mb-4">
        Welcome to Movies
      </h1>
      <h2 className="text-slate-800 text-2xl md:text-4xl font-semibold mb-4">
        Find your favorite films
      </h2>
      <button
        onClick={() => navigate("/search")}
        className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-4 mb-10 text-xl font-semibold rounded-full transition-all duration-300 cursor-pointer"
      >
        Browse Films
      </button>
      <img src="/movie-theater.png" alt="movie-theater.png" />
    </div>
  );
};

export default Home;
