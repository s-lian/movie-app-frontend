import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>

            <ul>
                <li><Link to="/"> Home</Link></li>
                <li> <Link to="Search Movies" > Search Movies </Link></li>
                <li><Link to="login"> Login </Link> </li>
                <li><Link to="registration"> Registration </Link> </li>
                <li><Link to="logout"> Logout </Link> </li>


            </ul>

        </nav>
    )



}