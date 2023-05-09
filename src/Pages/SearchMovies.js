
import React, { useState, useEffect } from "react"
import API_URL from "../API";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import SearchBar from "../Components/SearchBar";





export default function SearchMovies() {



    const [movies, setMovies] = useState([]);
    const [movieQuery, setMovieQuery] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(true);

    // const handleMovieQuery = (e) => {
    //     setMovieQuery(e.target.value);
    // };


    const movieColumn = [{ headerName: "Title", field: "title" },
    { headerName: "Year", field: "year" },
    { headerName: "IMDB rating", field: "imdbRating" },
    { headerName: "IMDBID", field: "imdbID" },
    { headerName: "RottenTomatoes", field: "rottenTomatoesRating" },
    { headerName: "Metacritic", field: "metacriticRating" },
    { headerName: "Rated", field: "classification" }
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
            console.error('Error fetching data: ', error);
        }
    };


    return (
        <div className="container">
            <h1> Search Movie </h1>

            {/* <div className="search-bar">
                <input type="text" icon="search" placeholder="Search by title" onChange={handleMovieQuery}></input>

            </div> */}

            <SearchBar onSubmit={(title, year) => {
                setMovieQuery(title)
                setYear(year)
            }}


            />
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