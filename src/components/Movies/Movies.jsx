import React from "react";
import Movie from "./Movie";
import styles from  "./Movies.module.css";

const Movies = ({ movies, onRemove }) => {


  return (
    <>
      <p>{movies.lenght}</p>
      <ul className={styles['container']}>
        {movies.map(movie=><Movie movie={movie} key={movie.id} onRemove={onRemove}/>)}
      </ul>
    </>
  );
};

export default Movies;
