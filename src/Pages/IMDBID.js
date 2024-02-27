import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import API_URL from "../API";
import { Table } from 'reactstrap'
import "../App.css";




export default function IMDBID() {


    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const imdbId = searchParams.get("title");
    const [movie, setMovie] = useState(null)
    const [error, setError] = useState(null);


    const handleCellClick = (event) => {
        // Handle cell click event here
        navigate(`/Actor?actorId=${event.target.textContent}`)
        console.log(event.target.textContent);
    }

    useEffect(() => {
        fetchMovie();
    },
        [])


    const fetchMovie = async () => {
        try {
            const response = await fetch(`${API_URL}/movies/data/${imdbId}`);
            const data = await response.json();
            setMovie(data);
        }
        catch (error) {
            setError(error)
        }
    };
    if (error) {
        return <p> Error: {error}</p>
    }

    if (!movie) {
        return <p> Loading</p>
    }


    return (
        <div className="title-box">



            <h1>{movie.title}</h1>
            <p className="plot">Plot: {movie.plot}</p>
            <div className="moviedetalis">

                <div className="movie-details">
                    <div className="movie-poster-section">
                        <img className="movie-poster" src={movie.poster} alt={movie.title} />
                    </div>
                    <div className="movie-specification">
                        <div className="detail-row">
                            <ul>
                                <li><p>Year: {movie.year}</p></li>
                                <li> <p>Runtime: {movie.runtime} minutes</p></li>
                                <li> <p>Genres: {movie.genres.join(", ")}</p></li>
                                <li> <p>Country: {movie.country}</p></li>

                            </ul>

                        </div>
                    </div>
                </div>


                <p className="box-office">Box Office: ${movie.boxoffice}</p>

                <Table hover bordered striped className="ag-theme-custom">
                    <thead>
                        <tr>
                            <th>ID</th><th>Role</th> <th>Name</th> <th>Characters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movie.principals.map((principal) => (
                            <tr key={principal.id}>


                                <td onClick={handleCellClick}>{principal.id}</td>


                                <td>{principal.category}</td>
                                <td>{principal.name}</td>
                                <td>{principal.characters.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>

                <div className="ratings-section left-aligned">
                    <p>Ratings:</p>
                    <ul>
                        {movie.ratings.map((rating) => (
                            <li key={rating.source}>
                                {rating.source}: {rating.value}
                            </li>
                        ))}
                    </ul>
                </div>


            </div>

        </div>

    )
}
