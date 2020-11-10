import React from "react";
import "./nav.component.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import LoginHook from '../Authentication/login-hooks'
import LogoutHook from '../Authentication/logout-hooks'

const Navbar = () => {
    var isSignedIn = useSelector(state => state.user.isSignedIn);
    var signInButton = <LoginHook />
    if (isSignedIn) {
        signInButton = <LogoutHook />
    }

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item title">
                    <Link to="/">
                        <span style={{ "color": "#007FAF"}}>t</span>
                        <span style={{ "color": "#007FAF" }}>r</span>
                        <span style={{ "color": "#007FAF" }}>i</span>
                        <span style={{ "color": "#F48F00" }}>v</span>
                        <span style={{ "color": "#F48F00" }}>a</span>
                        <span style={{ "color": "#C94A38" }}>g</span>
                        <span style={{ "color": "#C94A38" }}>o</span>
                    </Link>
                </li>
                {signInButton}
            </ul>
        </nav>
    )
}

export default Navbar;