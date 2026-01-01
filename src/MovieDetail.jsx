import { useEffect, useState } from "react";
import axios from "../api";
import YouTube from "react-youtube";
import { API_KEY } from "../requests";
import "./MovieDetail.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieDetail = ({ movie }) => {
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const fetchTrailer = async () => {
            try {
                const res = await axios.get(
                    `/movie/${movie.id}/videos?api_key=${API_KEY}`
                );

                const videos = res.data.results;

                const trailer =
                    videos.find(v => v.site === "YouTube" && v.type === "Trailer") ||
                    videos.find(v => v.site === "YouTube" && v.type === "Teaser");

                setTrailerKey(trailer ? trailer.key : null);
            } catch {
                setTrailerKey(null);
            }
        };

        fetchTrailer();
    }, [movie]);

    const opts = {
        height: "400",
        width: "100%",
        playerVars: { autoplay: 0 },
    };

    return (
        <div className="movie-detail">
            {/* LEFT SIDE */}
            <div className="detail-left">
                <h2>{movie.title || movie.name}</h2>

                <p>
                    <strong>Release Date:</strong>{" "}
                    {movie.release_date || "N/A"}
                </p>

                <p>
                    <strong>Vote:</strong>{" "}
                    {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}{" "}
                    / 10
                </p>

                <p className="overview">
                    {movie.overview || "No description available."}
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="detail-right">
                {trailerKey ? (
                    <YouTube videoId={trailerKey} opts={opts} />
                ) : (
                    <img
                        src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
                        alt={movie.title}
                        className="detail-backdrop"
                    />
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
