
import React, { useState, useEffect, useTransition } from "react"
import API_URL from "../API";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import SearchBar from "../Components/SearchBar";
import { useNavigate } from 'react-router-dom';

export default function SearchMovies() {
    const [movies, setMovies] = useState([]);
    const [movieQuery, setMovieQuery] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const movieColumn = [
        { headerName: "Title", field: "title", sortable: true, filter: true },
        { headerName: "Year", field: "year", sortable: true, filter: "agNumberColumnFilter" },
        { headerName: "IMDB rating", field: "imdbRating", sortable: true, filter: "agNumberColumnFilter" },
        { headerName: "IMDBID", field: "imdbID", sortable: true, filter: true },
        { headerName: "RottenTomatoes", field: "rottenTomatoesRating", sortable: true, filter: true },
        { headerName: "Metacritic", field: "metacriticRating", sortable: true, filter: true },
        { headerName: "Rated", field: "classification", sortable: true, filter: true }
    ];

    useEffect(() => {
        fetchData()
            .then(() => {
                setLoading(false)
            })
    }, [movieQuery, year]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/movies/search?title=${movieQuery}&year=${year}`);
            const realData = await response.json();
            const result = await realData.data.map(movie => {
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
            setMovies(result);

        }
        catch (error) {
            setError(error);
        }
    };

    return (
        <div className="searchmovie-box"
            style={
                {
                    background: "#ccc",
                    backgroundSize: "cover",
                }
            }>
            <h1> Search Movie </h1>

            <SearchBar onSubmit={(title, year) => {
                setMovieQuery(title)
                setYear(year)
            }}

            />
            <div className="ag-theme-balham"
                style={
                    {
                        width: "95%",
                        height: "300px",
                        marginLeft: "3%",
                        marginRight: "3%",
                        marginBottom: "20px",
                        marginTop: "20px",
                    }}>
                <AgGridReact
                    columnDefs={movieColumn}
                    rowData={movies}
                    pagination={true}
                    paginationPageSize={30}
                    defaultColDef={{ resizable: "true" }}

                    onRowClicked={(row) => {
                        navigate(`/imdbid?title=${row.data.imdbID}`)
                    }}
                />
            </div>
        </div >
    )
}