import React from "react";
import "./nav.component.css";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';

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
          <Link style={{fontWeight: "bolder", fontSize: "3rem", color: "#EE82EE"}} to="/">
            {/* <svg viewBox="50 10 120 60" xmlns="http://www.w3.org/2000/svg" width="120" height="60" fill="none"><g filter="url(#filter0_ddddddi)"><path d="M113.753 19.87c.165-.72.247-1.11.247-1.17 0-.84-.247-1.5-.741-1.98-.439-.48-1.016-.72-1.73-.72-1.207 0-1.976.6-2.305 1.8L98.435 53.534 88.141 26.801c-.439-1.14-1.208-1.71-2.306-1.71-1.153 0-1.921.57-2.306 1.71l-9.8 26.913L62.776 17.8a2.279 2.279 0 00-.905-1.26c-.385-.36-.824-.54-1.318-.54-.714 0-1.318.27-1.812.81-.494.48-.741 1.11-.741 1.89 0 .42.082.81.247 1.17L71.26 61.275c.165.54.466.99.906 1.35.494.3 1.015.42 1.564.36.44 0 .851-.15 1.236-.45.439-.36.768-.78.988-1.26l9.635-27.723 10.788 27.723c.22.54.522.96.906 1.26.385.3.824.45 1.318.45.494.06.96-.06 1.4-.36" stroke="#98A1F3" stroke-opacity=".73" stroke-width="2.5"></path></g><defs><filter id="filter0_ddddddi" x="-65.25" y="-107.25" width="318.5" height="309.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="-2" dy="-12"></feOffset><feGaussianBlur stdDeviation="10"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.743832 0 0 0 0 0.500955 0 0 0 0 0.829167 0 0 0 0.73 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="8" dy="-4"></feOffset><feGaussianBlur stdDeviation="3"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.31 0"></feColorMatrix><feBlend in2="effect1_dropShadow" result="effect2_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="2" dy="-3"></feOffset><feGaussianBlur stdDeviation="4"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.598889 0 0 0 0 0.632333 0 0 0 0 0.933333 0 0 0 0.64 0"></feColorMatrix><feBlend in2="effect2_dropShadow" result="effect3_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="-3" dy="10"></feOffset><feGaussianBlur stdDeviation="5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.32 0"></feColorMatrix><feBlend in2="effect3_dropShadow" result="effect4_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="8" dy="8"></feOffset><feGaussianBlur stdDeviation="65"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.57 0"></feColorMatrix><feBlend in2="effect4_dropShadow" result="effect5_dropShadow"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="8" dy="8"></feOffset><feGaussianBlur stdDeviation="52"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.31075 0 0 0 0 0.06875 0 0 0 0 0.825 0 0 0 0.7 0"></feColorMatrix><feBlend in2="effect5_dropShadow" result="effect6_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect6_dropShadow" result="shape"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dx="-2" dy="-2"></feOffset><feGaussianBlur stdDeviation="10"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix values="0 0 0 0 0.596078 0 0 0 0 0.631373 0 0 0 0 0.952941 0 0 0 0.73 0"></feColorMatrix><feBlend in2="shape" result="effect7_innerShadow"></feBlend></filter></defs></svg> */}
            W
          </Link>
        </li>
        {signInButton}
      </ul>
    </nav>
  )
}

export default Navbar;
