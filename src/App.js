import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    setLoading(true);
    const data = await (await fetch('https://swapi.dev/api/films/')).json();
    setLoading(false);
    console.log(data);
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
  };

  return (
    <React.Fragment>
      {loading && <p>Loading!!!</p>}
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
