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
    <nav className="navbar black">
      <ul className="navbar-nav">
        <li className="nav-item title">
          <Link to="/">
            <svg width="64" height="85" viewBox="48 -10 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_ddddddi)"><path d="M113.753 19.87c.165-.72.247-1.11.247-1.17 0-.84-.247-1.5-.741-1.98-.439-.48-1.016-.72-1.73-.72-1.207 0-1.976.6-2.305 1.8L98.435 53.534 88.141 26.801c-.439-1.14-1.208-1.71-2.306-1.71-1.153 0-1.921.57-2.306 1.71l-9.8 26.913L62.776 17.8a2.279 2.279 0 00-.905-1.26c-.385-.36-.824-.54-1.318-.54-.714 0-1.318.27-1.812.81-.494.48-.741 1.11-.741 1.89 0 .42.082.81.247 1.17L71.26 61.275c.165.54.466.99.906 1.35.494.3 1.015.42 1.564.36.44 0 .851-.15 1.236-.45.439-.36.768-.78.988-1.26l9.635-27.723 10.788 27.723c.22.54.522.96.906 1.26.385.3.824.45 1.318.45.494.06.96-.06 1.4-.36" stroke="#98A1F3" strokeOpacity=".73" strokeWidth="2.5" /></g><defs><filter id="filter0_ddddddi" x="-65.25" y="-107.25" width="318.5" height="309.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="-2" dy="-12" /><feGaussianBlur stdDeviation="10" /><feColorMatrix values="0 0 0 0 0.743832 0 0 0 0 0.500955 0 0 0 0 0.829167 0 0 0 0.73 0" /><feBlend in2="BackgroundImageFix" result="effect1_dropShadow" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="8" dy="-4" /><feGaussianBlur stdDeviation="3" /><feColorMatrix values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.31 0" /><feBlend in2="effect1_dropShadow" result="effect2_dropShadow" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="2" dy="-3" /><feGaussianBlur stdDeviation="4" /><feColorMatrix values="0 0 0 0 0.598889 0 0 0 0 0.632333 0 0 0 0 0.933333 0 0 0 0.64 0" /><feBlend in2="effect2_dropShadow" result="effect3_dropShadow" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="-3" dy="10" /><feGaussianBlur stdDeviation="5" /><feColorMatrix values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.32 0" /><feBlend in2="effect3_dropShadow" result="effect4_dropShadow" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="8" dy="8" /><feGaussianBlur stdDeviation="65" /><feColorMatrix values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.57 0" /><feBlend in2="effect4_dropShadow" result="effect5_dropShadow" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset dx="8" dy="8" /><feGaussianBlur stdDeviation="52" /><feColorMatrix values="0 0 0 0 0.31075 0 0 0 0 0.06875 0 0 0 0 0.825 0 0 0 0.7 0" /><feBlend in2="effect5_dropShadow" result="effect6_dropShadow" /><feBlend in="SourceGraphic" in2="effect6_dropShadow" result="shape" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /><feOffset dx="-2" dy="-2" /><feGaussianBlur stdDeviation="10" /><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /><feColorMatrix values="0 0 0 0 0.596078 0 0 0 0 0.631373 0 0 0 0 0.952941 0 0 0 0.73 0" /><feBlend in2="shape" result="effect7_innerShadow" /></filter></defs></svg>
          </Link>
        </li>
        {signInButton}
      </ul>
    </nav>
  )
}

export default Navbar;
