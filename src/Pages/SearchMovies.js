
import React, { useState, useEffect } from "react"
import API_URL from "../API";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { Button, Badge, Input } from "reactstrap";
import App from "../App";
import mockdata from "../rowdata"


export default function SearchMovies() {

    // const movietable = {
    //     column: [
    //         { headerName: "Title", field: "title" },
    //         { headerName: "Year", field: "year" },
    //         { headerName: "IMDB rating", field: "imdbRating" },
    //         { headerName: "IMDBID", field: "imdbID" },
    //         { headerName: "RottenTomatoes", field: "rottenTomatoesRating" },
    //         { headerName: "Metacritic", field: "metacriticRating" },
    //         { headerName: "Rated", field: "classification" }
    //     ],
    //     rowData: [
    //         {
    //             title: "Star Wars: Episode I - The Phantom Menace",
    //             year: 1999,
    //             imdbID: "tt0120915",
    //             imdbRating: 6.5,
    //             rottenTomatoesRating: 51,
    //             metacriticRating: 51,
    //             classification: "PG"
    //         }
    //     ]
    // };

    const [movies, setMovies] = useState([]);
    const [movieQuery, setMovieQuery] = useState("");
    const [serchText, setSearchText] = useState("");

    const handleMovieQuery = (e) => {
        setMovieQuery(e.target.value);
    };


    const movieColumn = [{ headerName: "Title", field: "title" },
    { headerName: "Year", field: "year" },
    { headerName: "IMDB rating", field: "imdbRating" },
    { headerName: "IMDBID", field: "imdbID" },
    { headerName: "RottenTomatoes", field: "rottenTomatoesRating" },
    { headerName: "Metacritic", field: "metacriticRating" },
    { headerName: "Rated", field: "classification" }
    ];






    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/search?title=${movieQuery}`);
                const realData = await response.json();
                const searchMovies = await realData.data.map(movie => {
                    return {
                        title: movie.title,
                        year: movie.year,
                        imdbID: movie.imdbID,
                        imdbRating: movie.imdbRating,
                        rottenTomatoesRating: movie.rottenTomatoesRating,
                        metacriticRating: movie.metacriticRating,
                        classification: movie.classification

                    };
                });
                setMovies(searchMovies);

            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [movieQuery]);

    const search = () => {

    }


    return (
        <div className="container">
            <h1> Search Movie </h1>

            <div className="search-bar">
                <input type="text" icon="search" placeholder="Search by title" onChange={handleMovieQuery}></input>

            </div>
            <div className="ag-theme-balham"
                style={
                    {
                        width: "1000px",
                        height: "300px",
                    }}>
                <AgGridReact
                    columnDefs={movieColumn}
                    rowData={movies}
                    pagination={true}
                    paginationPageSize={10}

                    defaultColDef={{ resizable: true }}
                />


            </div>
        </div>

    )


}