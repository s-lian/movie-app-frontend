import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SearchMovies from "./Pages/SearchMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import IMDBID from "./Pages/IMDBID";
import Logout from "./Pages/Logout";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Actor from "./Pages/Actor";




export default function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="Search Movies" element={< SearchMovies />} />
                    <Route path="imdbID" element={< IMDBID />} />
                    <Route path="logout" element={< logout />} />
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path="actor" element={<Actor />} />


                </Routes>

                <Footer />

            </div>

        </BrowserRouter>


    )
}