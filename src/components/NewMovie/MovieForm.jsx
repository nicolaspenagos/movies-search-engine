import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./MovieForm.module.css";
import useInputReducer from "../../hooks/useInputReducer";
import { isNotEmpty } from "../../utils/inputValidations";
import { formatToTitleURLRequest } from "../../utils/urlUtils";
import useHttp from "../../hooks/useHttp";
import { v4 as uuidv4 } from "uuid";

const MovieForm = ({ onAddMovie }) => {
  const {
    onChangeHandler: movieNameOnChangeHandler,
    onBlurHandler: movieNameOnBlurHandler,
    onClearHandler: movieNameOnClearHandler,
    hasError: movieNameHasError,
    inputState: movieNameState,
  } = useInputReducer(isNotEmpty);

  const {
    isLoading: movieFetchIsLoading,
    error: movieFetchError,
    sendRequest: fetchMovie,
  } = useHttp();

  const [movieNotFound, setMovieNotFound] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setMovieNotFound(false);
    const url = formatToTitleURLRequest(
      process.env.REACT_APP_API_URL,
      movieNameState.value,
      process.env.REACT_APP_API_KEY
    );

    fetchMovie({ url }, addMovieHandler);
  };

  const addMovieHandler = (response) => {
    if (response.Error) setMovieNotFound(true);
    else {
      onAddMovie({ ...response, id: uuidv4() });
      movieNameOnClearHandler();
    };
  };

  const inputClasses = `${styles.input} ${
    movieNameHasError ? styles["input-error"] : ""
  }`;

  const isFormValid = movieNameState.isTouched && !movieNameHasError;
  const buttonClasses = `${styles.action} ${
    !isFormValid ? styles["button-error"] : ""
  }`;

  let feedbackText = " ";
  if (movieFetchIsLoading) feedbackText = "Loading...";
  if (movieFetchError) feedbackText = "Something went wrong";
  if (movieNotFound) feedbackText = "Movie not found!";

  return (
    <>
      <Card>
        <form className={styles["movie-form"]} onSubmit={submitHandler}>
          <input
            id="name"
            type="text"
            placeholder="Enter the name of the movie"
            className={inputClasses}
            onChange={movieNameOnChangeHandler}
            value={movieNameState.value}
            onBlur={movieNameOnBlurHandler}
          />
          <button
            type="submit"
            className={buttonClasses}
            disabled={!isFormValid}
          >
            Add
          </button>
        </form>
      </Card>
      <div className={styles.feedback}>
        <p>{feedbackText}</p>
      </div>
    </>
  );
};

export default MovieForm;
