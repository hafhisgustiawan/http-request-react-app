import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  // ALASAN KENAPA MENGGUNAKAN USE CALLBACK DISINI
  // 1) KARENA KITA MENGGUNAKAN USE EFFECT UNTUK MELAKUKAN LOAD DATA DI AWAL MULAI
  // 2) KITA BISA AJA MENGOSONGKAN DEPENDENCIES USE EFFECT DAN SISTEM AKAN BERJALAN
  // 3) TETAPI SETIAP KALI LOAD, MAKA FUNCTION fetchMoviesHandler JUGA AKAN DIBUAT ULANG, PERFORMANCE ISUES
  // 4) KARENA ITU JADIKAN SAJA DIA CACHE SUPAYA TIDAK DIBUAT ULANG2 TERUS
  // 5) LALU JADIKAN DIA DEPENDENCIES DI USE EFFECT, WIN WIN SOLUTION

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        // it will be execute in catch block
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      setMovies(
        data.results.map((el) => {
          return {
            id: el.episode_id,
            title: el.title,
            releaseDate: el.release_date,
            openingText: el.opening_crawl,
          };
        })
      );
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Movies not found!</p>;
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (loading) content = <p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
