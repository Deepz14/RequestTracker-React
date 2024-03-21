import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="nav-container">
            <div className="logo-container">
               <Link to={'/'}><h1>Request Tracker</h1></Link>
            </div>
            <ul className="nav-items">
                <li className="nav-links">
                    <NavLink activeclassname="active" to={'/request/add'}>Add Request</NavLink>
                </li>
                <li className="nav-links">
                    <NavLink activeclassname="active" to={'/logout'}>Logout</NavLink>
                </li>
            </ul> 
        </nav>
    )
}

export default Navbar;