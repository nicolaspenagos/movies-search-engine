import React, { useState } from "react";
import MovieForm from "./components/NewMovie/MovieForm";
import styles from "./App.module.css";
import Movies from "./components/Movies/Movies";

const App = () => {
  const [movies, setMovies] = useState([]);

  const addMovieHandler = (newMovie) => {
    setMovies((prevState) => [...prevState, newMovie]);
  };

  const removeMovieHandler = (id) => {
    setMovies((prevState)=>prevState.filter(movie=>movie.id!==id))
  }

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>MOVIES SEARCH ENGINE</h1>
      <MovieForm onAddMovie={addMovieHandler} />
      <Movies movies={movies} onRemove={removeMovieHandler}/>
    </main>
  );
};

export default App;
