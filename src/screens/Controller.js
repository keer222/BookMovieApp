import React, { useEffect, useState } from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";

const Controller = () => {
  const baseUrl = "/api/v1/";

  const [unReleasedMovies, setUnReleasedMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);

  const [movieDetail, setMovieDetail] = useState({});
  const [videoId, setVideoId] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayBookShowButton, setDisplayBookShowButton] = useState("none");

  useEffect(async () => {
    await fetch(baseUrl + "movies/?page=1&limit=20", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: null,
    })
      .then((response) => response.json())
      .then((response) => {
        setUnReleasedMovies(response.movies.filter(item => {
          return item.status === "PUBLISHED";
        }));
        setReleasedMovies(response.movies.filter(item => {
          return item.status === "RELEASED";
        }));
        // setFilteredMovies(response.movies.filter(item => {
        //   return item.status === "RELEASED";filteredMovies={filteredMovies} setFilteredMovies={setFilteredMovies}
        // }));
      }).catch(e => {
        console.log(e);
      });
  }, []);
  // loadData();
  return (
    <Router>
      <div className="main-container">
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} releasedMovies={releasedMovies} unReleasedMovies={unReleasedMovies}
            movieDetail={movieDetail} setMovieDetail={setMovieDetail} videoId={videoId} setVideoId={setVideoId}
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setDisplayBookShowButton={setDisplayBookShowButton}
            displayBookShowButton={displayBookShowButton} baseUrl={baseUrl} />}
        />
        <Route
          path="/movie/:id"
          render={(props) => <Details {...props} movieDetail={movieDetail} videoId={videoId}
            displayBookShowButton={displayBookShowButton} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        />
      </div>
    </Router>
  );
};

export default Controller;
