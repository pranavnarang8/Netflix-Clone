import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = (props) => {
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    };

    fetchData();
    //if [], the code will only run once, now the useEffect will be called each time fetchUrl changes.
    //eslint-disable-next-line
  }, [fetchUrl]);

  const handlePosterClick = (movie) => {
    console.log("function hit" + trailerUrl);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      //movieTrailer is a function of the npm package movie-trailer, it will try to find a trailer for the movie name passed
      movieTrailer(
        movie?.name ||
          movie?.original_title ||
          movie?.title ||
          movie?.original_name ||
          ""
      )
        .then((url) => {
          // http://www.youtube.com/watch?v=u8nQa1cJyX8 is something the youtube url looks like with video ID
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));

          //.get('v') will get you the value of v in the url, which is the ID here
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h4>{title}</h4>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              //key is a step that marginally optimises performance, just provide a unique key for each array object
              key={movie.id}
              className={`${isLargeRow ? "posterLarge" : "posters"}`}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => handlePosterClick(movie)}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
