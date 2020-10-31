import React from "react";
import "./nav.component.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <nav className="nav-nav">
                <NavItemLogin />
            </nav>
        </div>
    )
}

const NavItemLogin = () => {
    return (
        <li className="nav-item nav-login">
            <button className="nav-login-button">
                <i className='fa fa-user'></i>
                <span className="nav-login-text">Login</span>
            </button>
            
        </li>
    )
}

export default Navbar;