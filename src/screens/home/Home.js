import { GridList, GridListTile, GridListTileBar, Card, MenuItem, FormControl, InputLabel, Input, Select, withStyles, Button, TextField, Checkbox } from "@material-ui/core";
import React, { useEffect, useReducer, useState } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const styles1 = (theme) => ({
    card: {
        margin: theme.spacing.unit,
        width: 280,
        paddingLeft: theme.spacing.unit * 4,
    },
    header: {
        color: theme.palette.primary.light
    }
});

const Home = (props) => {
    const { classes } = props;
    const [moviename, setMoviename] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [releaseStart, setReleaseStart] = useState("");
    const [releaseEnd, setReleaseEnd] = useState("");
    const [state, dispatch] = useReducer(UpdateFilterOnMoviesList, { filteredMovies: props.releasedMovies });

    async function fetchData() {

        await fetch(props.baseUrl + "genres", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: null,
        }).then((response) => response.json())
            .then((response) => {
                setGenres(response.genres);
            }).catch(err => {
                console.log(err);
            });

        await fetch(props.baseUrl + "artists?page=1&limit=30", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: null,
        }).then((response) => response.json())
            .then((response) => {
                setArtists(response.artists);
            }).catch(err => {
                console.log(err);
            });
    }
    fetchData();
    useEffect(() => {
        applyButtonHandler();
    }, [props.releasedMovies]);

    const applyButtonHandler = () => {
        let result = props.releasedMovies;
        if (moviename !== "") {
            result = result.filter(item => {
                return item.title.includes(moviename);
            });
        }
        if (selectedGenres.length > 0) {
            result = result.filter(item =>
                selectedGenres.find(s => item.genres.toString().includes(s))
            );
        }
        if (selectedArtists.length > 0) {
            result = result.filter(item =>
                item.artists.find(artist => selectedArtists.find(s => s.includes(artist.first_name + " " + artist.last_name)))
            );
        }
        if (releaseEnd !== "" || releaseStart !== "") {
            result = result.filter(item => {
                let release = new Date(item.release_date).getTime();
                let start = new Date(releaseStart).getTime();
                let end = new Date(releaseEnd).getTime();
                return (start === release || end === release || (start < release && end > release));
            })
        }
        dispatch({ "type": "UPDATE_MOVIE_FILTER", payload: result });
    }

    function UpdateFilterOnMoviesList(state, action) {
        switch (action.type) {
            case "UPDATE_MOVIE_FILTER":
                return { ...state, filteredMovies: action.payload };
            default: return state;
        }
    }

    function loadPoster(e, id) {
        let data = props.releasedMovies.filter(item => {
            return item.id === id;
        });
        props.setMovieDetail(data[0]);
        let urlArray = data[0].trailer_url.split("=");
        if (urlArray.length === 2)
            props.setVideoId(urlArray[1]);
    }
    return (
        <div className="home">
            <Header {...props} displayBookShowButton={"none"} displayLogoutButton={props.isLoggedIn ? "block" : "none"} displayLoginButton={props.isLoggedIn ? "none" : "block"} />
            <p className="sub-header">Upcoming Movies</p>
            <div className="grid-list-container">
                <GridList className="grid-list" cols={6} style={{ flexWrap: "nowrap" }}>
                    {props.unReleasedMovies.map(tile => (
                        <GridListTile key={tile.id} style={{ height: "250px !important" }}>
                            <img src={tile.poster_url} alt={tile.title} />
                            <GridListTileBar title={tile.title} className="title-bar" />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="home-body-container">
                <div className="grid-movies-left">
                    <GridList className="grid-list-posters" cols={4}>
                        {state.filteredMovies.map(tile => (
                            <GridListTile key={tile.id} className="poster-style">
                                <Link to={"movie/" + tile.id} >
                                    <img src={tile.poster_url} alt={tile.title} onClick={e => { loadPoster(e, tile.id) }} />
                                    <GridListTileBar title={tile.title} subtitle={"Release Date:" + new Date(tile.release_date)} className="title-bar"
                                        onClick={e => { loadPoster(e, tile.id) }} />
                                </Link>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
                <div className="find-movies-right">
                    <Card className={classes.card}>
                        <p className={classes.header}>FIND MOVIES BY:</p>
                        <FormControl className="formControl">
                            <InputLabel htmlFor="moviename"> Movie Name </InputLabel>
                            <Input
                                id="moviename"
                                value={moviename}
                                type="text"
                                onChange={event => { setMoviename(event.target.value) }}
                            />
                        </FormControl><br /><br />
                        <FormControl className="formControl">
                            <InputLabel htmlFor="selectedGenres"> Genres </InputLabel>
                            <Select id="selectedGenres" multiple value={selectedGenres} renderValue={(selected) => selected.join(",")}
                                onChange={e => { setSelectedGenres(e.target.value) }}>
                                {genres.map((item) => (
                                    <MenuItem key={item.id} value={item.genre}>
                                        <Checkbox label={item.genre} />{item.genre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl><br /><br />
                        <FormControl className="formControl">
                            <InputLabel htmlFor="selectedArtists"> Artists </InputLabel>
                            <Select id="selectedArtists" multiple value={selectedArtists} renderValue={(selected) => selected.join(",")}
                                onChange={e => { setSelectedArtists(e.target.value) }}>
                                {artists.map((item) => (
                                    <MenuItem key={item.id} value={item.first_name + " " + item.last_name}>
                                        <Checkbox label={item.first_name} />{item.first_name + " " + item.last_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl><br /><br />
                        <FormControl className="formControl">
                            <InputLabel htmlFor="releaseStart" shrink={true}> Release Date Start </InputLabel><br />
                            <TextField id="releaseStart" type="date" onChange={event => { setReleaseStart(event.target.value) }}> </TextField>
                        </FormControl><br /><br /><br />
                        <FormControl className="formControl">
                            <InputLabel htmlFor="releaseEnd" shrink={true}> Release Date End </InputLabel><br />
                            <TextField id="releaseEnd" type="date" onChange={event => { setReleaseEnd(event.target.value) }}> </TextField>
                        </FormControl><br /><br /><br />
                        <FormControl className="formControl">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={applyButtonHandler} >APPLY
                            </Button>
                        </FormControl><br /><br /><br /><br />
                    </Card>
                </div>
            </div>
        </div >
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles1)(Home);