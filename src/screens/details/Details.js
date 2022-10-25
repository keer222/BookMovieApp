import React from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./Details.css";
import YouTube, { YouTubeProps } from 'react-youtube';

const Details = ({ movieDetail }) => {

    function getYouTubeTrailer() {
        const onPlayerReady: YouTubeProps['onReady'] = (event) => {
            event.target.pauseVideo();
        }

        const opts: YouTubeProps['opts'] = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1,
            },
        };

        return <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} />;
    }

    return (
        <div>
            <Header />
            <Typography className="back-home">
                <Link to="/">
                    &#60; Back to Home
                </Link>
            </Typography>
            <div className="details-container">
                <div>
                    <img src={movieDetail.poster_url} alt={movieDetail.title} />
                </div>
                <div>
                    <Typography variant="headline" component="h2">
                        {movieDetail.title}
                    </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Genre:</span> {movieDetail.genres} </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Duration:</span> {movieDetail.duration} </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Release Date:</span> {movieDetail.release_date} </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Rating:</span> {movieDetail.rating} </Typography>
                    <Typography style={{ marginTop: "16px" }}> <span style={{ fontWeight: "bold" }}> Plot:</span> <a href={movieDetail.wiki_url}>Wiki Link</a> {movieDetail.storyline}</Typography>
                    <Typography style={{ fontWeight: "bold", marginTop: "16px" }}> Trailer: </Typography>
                    {getYouTubeTrailer}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Details;