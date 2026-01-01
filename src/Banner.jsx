import { useEffect, useState } from "react";
import axios from "../api";
import requests from "../requests";
import "./Banner.css";

const Banner = () => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(requests.fetchNetflixOriginals);
            const movies = res.data.results;

            const randomMovie =
                movies[Math.floor(Math.random() * movies.length)];

            setMovie(randomMovie);
        }

        fetchData();
    }, []);

    return (
        movie && (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                }}
            >
                <div className="banner-content">
                    <h1>{movie?.title || movie?.name}</h1>
                    <p>{movie?.overview}</p>
                </div>
            </header>
        )
    );
};

export default Banner;