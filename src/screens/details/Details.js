import React, { useState } from "react";
import Header from "../../common/header/Header";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./Details.css";
import YouTube from 'react-youtube';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { GridList, GridListTileBar, GridListTile } from "@material-ui/core";

const Details = ({ movieDetail, videoId }) => {

    const [ratingColor, setRatingColor] = useState(["black", "black", "black", "black", "black"]);

    const changeColor = (e, index) => {
        let rating = ratingColor;
        for (let i = 0; i <= index; i++) {
            rating[i] = "yellow";
        }
        setRatingColor(rating);
    }

    const opts = {
        width: '95%',
        playerVars: {
            autoplay: 1,
        },
    }

    const onPlayerReady = (event) => {
        event.target.pauseVideo();
    }

    const getGenre = () => {
        let genre = movieDetail.genres.map(genre => (genre + ", "));
        return genre.substring(0, genre.length - 2);
    }

    return (
        <div>
            <Header />
            <div className="details-container">
                <Typography>
                    <Link to="/"><span className="back-home"> &#60; Back to Home</span></Link>
                </Typography>
            </div>
            <div className="details-sub-container">
                <div>
                    <img src={movieDetail.poster_url} alt={movieDetail.title} />
                </div>
                <div>
                    <Typography variant="headline" component="h2">
                        {movieDetail.title}
                    </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Genre:</span> {getGenre} </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Duration:</span> {movieDetail.duration} </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Release Date:</span> {movieDetail.release_date} </Typography>
                    <Typography> <span style={{ fontWeight: "bold" }}>Rating:</span> {movieDetail.rating} </Typography>
                    <Typography style={{ marginTop: "16px" }}> <span style={{ fontWeight: "bold" }}> Plot:</span> <a href={movieDetail.wiki_url}>(Wiki Link)</a> {movieDetail.storyline}</Typography>
                    <Typography style={{ fontWeight: "bold", marginTop: "16px" }}> Trailer: </Typography>
                    <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
                </div>
                <div>
                    <Typography style={{ fontWeight: "bold" }}>Rate this movie: </Typography>
                    <StarBorderIcon style={{ color: ratingColor[0] }} onClick={e => { changeColor(e, 0) }} />
                    <StarBorderIcon style={{ color: ratingColor[1] }} onClick={e => { changeColor(e, 1) }} />
                    <StarBorderIcon style={{ color: ratingColor[2] }} onClick={e => { changeColor(e, 2) }} />
                    <StarBorderIcon style={{ color: ratingColor[3] }} onClick={e => { changeColor(e, 3) }} />
                    <StarBorderIcon style={{ color: ratingColor[4] }} onClick={e => { changeColor(e, 4) }} />
                    <Typography style={{ fontWeight: "bold", marginTop: "16px", marginBottom: "16px" }}>Artists:</Typography>
                    <GridList cols={2}>
                        {movieDetail.artists.map(artist => (
                            <GridListTile key={artist.id}>
                                <img src={artist.profile_url} alt={artist.id} />
                                <GridListTileBar title={artist.first_name + " " + artist.last_name} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        </div>
    )
}

export default Details;