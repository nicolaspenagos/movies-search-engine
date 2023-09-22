import React from "react";
import Card from "../UI/Card";
import styles from "./Movie.module.css";
import defaultPoster from "../../images/default-poster.jpg"


const Movie = ({ movie, onRemove }) => {
  const posterURL = movie.Poster ==="N/A" ? defaultPoster:movie.Poster;
  const removeMovieHandler = () => {
    onRemove(movie.id);
  }
  return (
    <Card style={{ width: "fit-content", margin:"10px" }}>
      <li className={styles.movie} onClick={removeMovieHandler}>
        <div style={{ backgroundImage: `url(${posterURL})` }}></div>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </li>
    </Card>
  );
};

export default Movie;
