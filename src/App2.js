import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SearchMovies from "./Pages/SearchMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button, Badge, Nav, NavItem, NavLink, pills } from "reactstrap";


export default function App2() {

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>


                    <Route path="movies" element={< SearchMovies />} />

                </Routes>
                <Footer />

            </div>

        </BrowserRouter>


    )
}