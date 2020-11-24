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
                        <span>
                            <svg className="logo" width="254" height="203" viewBox="0 0 254 203" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_ddddddi)">
                                    <path d="M113.753 19.8704C113.918 19.1503 114 18.7603 114 18.7003C114 17.8602 113.753 17.2001 113.259 16.7201C112.82 16.24 112.243 16 111.529 16C110.322 16 109.553 16.6001 109.224 17.8002L98.4353 53.534L88.1412 26.8011C87.702 25.661 86.9333 25.091 85.8353 25.091C84.6824 25.091 83.9137 25.661 83.5294 26.8011L73.7294 53.714L62.7765 17.8002C62.6118 17.2601 62.3098 16.8401 61.8706 16.5401C61.4863 16.18 61.0471 16 60.5529 16C59.8392 16 59.2353 16.27 58.7412 16.8101C58.2471 17.2901 58 17.9202 58 18.7003C58 19.1203 58.0824 19.5104 58.2471 19.8704L71.2588 61.2748C71.4235 61.8149 71.7255 62.2649 72.1647 62.625C72.6588 62.925 73.1804 63.045 73.7294 62.985C74.1686 62.985 74.5804 62.835 74.9647 62.5349C75.4039 62.1749 75.7333 61.7549 75.9529 61.2748L85.5882 33.5519L96.3765 61.2748C96.5961 61.8149 96.898 62.2349 97.2824 62.5349C97.6667 62.835 98.1059 62.985 98.6 62.985C99.0941 63.045 99.5608 62.925 100 62.625" stroke="#98A1F3" stroke-opacity="0.73" stroke-width="2.5" />
                                </g>
                                <defs>
                                    <filter id="filter0_ddddddi" x="-65.25" y="-107.25" width="318.5" height="309.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="-2" dy="-12" />
                                        <feGaussianBlur stdDeviation="10" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.743832 0 0 0 0 0.500955 0 0 0 0 0.829167 0 0 0 0.73 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="8" dy="-4" />
                                        <feGaussianBlur stdDeviation="3" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.31 0" />
                                        <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="2" dy="-3" />
                                        <feGaussianBlur stdDeviation="4" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.598889 0 0 0 0 0.632333 0 0 0 0 0.933333 0 0 0 0.64 0" />
                                        <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="-3" dy="10" />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.32 0" />
                                        <feBlend mode="normal" in2="effect3_dropShadow" result="effect4_dropShadow" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="8" dy="8" />
                                        <feGaussianBlur stdDeviation="65" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.596354 0 0 0 0 0.632135 0 0 0 0 0.954167 0 0 0 0.57 0" />
                                        <feBlend mode="normal" in2="effect4_dropShadow" result="effect5_dropShadow" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dx="8" dy="8" />
                                        <feGaussianBlur stdDeviation="52" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.31075 0 0 0 0 0.06875 0 0 0 0 0.825 0 0 0 0.7 0" />
                                        <feBlend mode="normal" in2="effect5_dropShadow" result="effect6_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dx="-2" dy="-2" />
                                        <feGaussianBlur stdDeviation="10" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.596078 0 0 0 0 0.631373 0 0 0 0 0.952941 0 0 0 0.73 0" />
                                        <feBlend mode="normal" in2="shape" result="effect7_innerShadow" />
                                    </filter>
                                </defs>
                            </svg>

                        </span>


                    </Link>
                </li>
                {signInButton}
            </ul>
        </nav>
    )
}

export default Navbar;