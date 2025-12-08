import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        
        const movies = response.data.results;

        const randomMovie =
          movies[Math.floor(Math.random() * movies.length)];

        setMovie(randomMovie);

        console.log("Banner movie:", randomMovie);

      } catch (error) {
        console.error("Banner fetch error:", error);
      }
    }

    fetchMovie();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
          : "linear-gradient(#111,#333)",

        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <p className="banner_description">
          {movie?.overview}
        </p>
      </div>

      <div className="banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;