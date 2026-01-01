import { useEffect, useState } from "react";
import axios from "../api";
import "./MovieList.css";
import MovieDetail from "./MovieDetail";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ title, fetchUrl, isLarge }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(fetchUrl);
            setMovies(res.data.results);
        }

        fetchData();
    }, [fetchUrl]);

    return (
        <div className="movie-row">
            <h2>{title}</h2>

            <div className="movie-row-posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`movie-poster ${isLarge && "movie-poster-large"}`}
                        src={`${IMAGE_BASE_URL}${isLarge ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.name}
                        onClick={() =>
                            selectedMovie?.id === movie.id
                                ? setSelectedMovie(null)
                                : setSelectedMovie(movie)
                        }
                    />
                ))}

            </div>
            {selectedMovie && (
                <MovieDetail movie={selectedMovie} />
            )}
        </div>
    );
};

export default MovieList;
