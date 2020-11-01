import React from "react";
import "./nav.component.css";
import SearchBar from '../homepage.component/searchbar/searchbar.component'

const Navbar = () => {
    return (
        <div className="navbar">
            <nav className="nav-nav-login">
                <NavItemLogin />
            </nav>
            <nav className="nav-nav-search">
                <NavSearchBar />
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

const NavSearchBar = () => {
    return (
    <div className="search-box">
            <SearchBar></SearchBar>
    </div>
        )
    }

export default Navbar;