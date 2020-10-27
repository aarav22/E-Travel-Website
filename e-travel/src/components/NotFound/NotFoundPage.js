/* Citation: CSS and HTML code inspired from {
    CodePen: Ricardo Prieto, 
    url: https://codepen.io/ricardpriet/pen/qVZxNo
    }   
*/

import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

import './NotFoundPage.css'

export default function NotFoundPage(props) {
    return (
    <div>
        <h1>404: Page not found</h1>
        <section class="error-container">
            <span class="four"><span class="screen-reader-text">4</span></span>
            <span class="zero"><span class="screen-reader-text">0</span></span>
            <span class="four"><span class="screen-reader-text">4</span></span>
        </section>
        <div class="link-container">
            <Link class="more-link" to="/">Go to Home </Link>
        </div>
    </div>);
}