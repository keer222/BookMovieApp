import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";

const Home = (props) => {
    const [unReleasedMovies, setUnReleasedMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);

    useEffect(() => {

        fetch(props.baseUrl + "movies/?page=1&limit=20", {
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
            });
    }, []);

    return (
        <div >
            <Header />
            <p className="sub-header">Upcoming Movies</p>
            <div className="grid-list-container">
                <GridList className="grid-list" cols={5} style={{ flexWrap: "nowrap" }}>
                    {unReleasedMovies.map(tile => (
                        <GridListTile key={tile.id}>
                            <img src={tile.poster_url} alt={tile.title} />
                            <GridListTileBar title={tile.title} className="title-bar" />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="home-body">
                <div className="grid-movies-left">
                    <GridList className="grid-list-posters" cols={4}>
                        {releasedMovies.map(tile => (
                            <GridListTile key={tile.id}>
                                <img src={tile.poster_url} alt={tile.title} />
                                <GridListTileBar title={tile.title} className="title-bar" />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="find-movies-right">

                </div>
            </div>
        </div >
    )
}

export default Home;