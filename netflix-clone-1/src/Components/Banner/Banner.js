import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

function Banner() {
  const [movie, setMovie] = useState(null);

  // Shorten overview text
  const truncate = (string, n) => {
    return string?.length > n
      ? string.substr(0, n - 1) + "..."
      : string;
  };

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);

        // Pick random movie
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.error("API error:", error);
      }
    })();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <p className="banner_description">
          {truncate(movie?.overview, 150)}
        </p>
      </div>

      <div className="banner_fadeBottom"></div>
    </header>
  );
}

export default Banner;
