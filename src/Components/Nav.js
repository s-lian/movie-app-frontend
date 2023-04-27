import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div>

            <li><Link to="/"> Home</Link></li>
            <li> <Link to="movies" > Movies</Link></li>
            <li><Link to="actors"> Actors </Link> </li>
        </div>
    )



}