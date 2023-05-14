import { json, useSearchParams } from "react-router-dom";
import API_URL from "../API";
import Login from "./Login";
import React, { useState, useEffect } from 'react';
import RefreshToken from "../Components/RefreshToken";
import { useNavigate } from "react-router-dom";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"
import { AgGridReact } from "ag-grid-react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';




export default function Actor() {
    Chart.register(...registerables);

    const [searchParams] = useSearchParams();
    const actorId = searchParams.get("actorId");
    const navigate = useNavigate();
    const [actors, setActors] = useState([]);
    const [actorInfo, setActorInfo] = useState({});
    const [ratingChart, setRatingChart] = useState([])


    const actorColumn =
        [{ headerName: "Role", field: "role", sortable: true, cellStyle: { borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' } },
        { headerName: "Movie", field: "movie", sortable: true, cellStyle: { borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' } },
        { headerName: "Character", field: "character", sortable: true, cellStyle: { borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' } },
        { headerName: "Rating", field: "rating", sortable: true, cellStyle: { borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc' } }
        ];


    const data = {
        labels: ['0-2', '0-4', '4-6', '6-8', '8-10'], // IMDb rating ranges
        datasets: [
            {
                label: 'IMDB Ratings',
                data: ratingChart, // Placeholder values
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 1, // Display y-axis labels in whole numbers
            },
        },
    };






    const getPersonalDetails = async () => {
        const url = `${API_URL}/people/${actorId}`;
        const bearerToken = localStorage.getItem("bearer_token");
        if (bearerToken) {
            const currentTime = Math.floor(Date.now() / 1000);
            const bearerTokenCreatedTime = localStorage.getItem("Time");


            if ((currentTime - bearerTokenCreatedTime) > 550) {
                try {
                    // Refresh the bearer token
                    await RefreshToken();
                } catch (error) {
                    console.log("Token refresh failed:", error);
                    // Handle token refresh failure or redirect to login
                    navigate('/login')
                    return;
                }
            }
            const refreshedBearerToken = localStorage.getItem("bearer_token")
            try {
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${refreshedBearerToken}`
                    },
                });
                const respond = await res.json();
                const realData = await respond.roles.map(rolePlayed => {
                    return {
                        role: rolePlayed.category,
                        movie: rolePlayed.movieName,
                        character: rolePlayed.characters,
                        rating: rolePlayed.imdbRating

                    }
                });



                setActors(realData);
                setActorInfo({
                    name: respond.name,
                    birthYear: respond.birthYear,
                    deathYear: respond.deathYear,
                })




                const ratingCounts = [0, 0, 0, 0, 0];

                respond.roles.forEach((rolePlayed) => {
                    const imdbRating = rolePlayed.imdbRating;
                    if (imdbRating >= 0 && imdbRating < 2) {
                        ratingCounts[0]++;
                    } else if (imdbRating >= 2 && imdbRating < 4) {
                        ratingCounts[1]++;
                    } else if (imdbRating >= 4 && imdbRating < 6) {
                        ratingCounts[2]++;
                    } else if (imdbRating >= 6 && imdbRating <= 8) {
                        ratingCounts[3]++;
                    }
                    else if (imdbRating >= 8 && imdbRating <= 10) {
                        ratingCounts[4]++;
                    }
                });

                setRatingChart(ratingCounts);



            }
            catch (error) {
                return console.log(error);
            }
        }
    };

    useEffect(() => {
        getPersonalDetails();
    }, []);




    return (


        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>{actorInfo.name}</h1>
            <h3>{actorInfo.birthYear}-{actorInfo.deathYear}</h3>

            <div className="ag-theme-custom" style={{ width: '800px', height: '300px' }}>
                <AgGridReact
                    columnDefs={actorColumn}
                    rowData={actors}
                    pagination={true}
                    paginationPageSize={10}
                    defaultColDef={{ resizable: true }}


                />
            </div>

            <div style={{ width: '500px', height: '300px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}







