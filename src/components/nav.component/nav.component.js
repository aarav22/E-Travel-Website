import React from "react";
import "./nav.component.css";
// import SearchBar from '../homepage.component/searchbar/searchbar.component'
import LoginHook from '../Authentication/login-hooks'
import LogoutHook from '../Authentication/logout-hooks'
import { useSelector } from 'react-redux';

const Navbar = () => {
    var isSignedIn = useSelector(state => state.user.isSignedIn);
    var signInButton = <LoginHook />
    if (isSignedIn) {
        signInButton = <LogoutHook />
    }

    return (
        <div className="navbar">
            <nav className="nav-nav-login">
                {signInButton}
            </nav>
            <nav className="nav-nav-search">
                <NavSearchBar />
            </nav>
        </div>
    )
}

const NavSearchBar = () => {
    return (
        <div className="search-box">
        </div>
    )
}

export default Navbar;