import React, { useEffect, useState } from 'react';
import Styles from './index.css';
import MovieDisplay from './components/MovieDisplay';
import Form from './components/Form';


export default function App() {
  const apiKey = "98e3fb1f";

  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      console.log("Movie Data:", data);
      if (data && data.Response === "True") {
        setMovie(data);
      } else {
        setMovie(null);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  const getRandomMovie = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=&type=movie&page=1`
      );
      const data = await response.json();
      console.log("Response Data:", data);
      if (data && data.Response === "True" && data.Search && data.Search.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.Search.length);
        const imdbId = data.Search[randomIndex].imdbID;
        await fetchMovieById(imdbId);
      } else {
        throw new Error("Failed to find a movie.");
      }
    } catch (e) {
      console.error(e);
      setMovie(null);
    }
  };
  
  
  
  const fetchMovieById = async (imdbId) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}`
      );
      const data = await response.json();
      console.log("Random Movie Data:", data);
      if (data && data.Response === "True") {
        setMovie(data);
      } else {
        setMovie(null);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  const generateRandomSearchTerm = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let searchTerm = "";
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      searchTerm += characters[randomIndex];
    }
    return searchTerm;
  };
  
  

  useEffect(() => {
    getMovie("Clueless");
  },[]);
  
  return (
    <div className="App">
      <Form movieSearch={getMovie} />
      <MovieDisplay movie={movie} /> 
    </div>
  );
}
