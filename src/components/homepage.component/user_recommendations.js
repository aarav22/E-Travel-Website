import React, {useState, useRef, useEffect} from 'react';


const carousel = (props) => {
    console.log("gggggggggggggg", props)
    return (
        <section style={{ display: "flex", justifyItems: "center" }}>
            <div id="2" style={{ position: "absolute", left: "10%", top: "60rem", width: "80%" }} className="carousel carousel-slider center">
                <div className="carousel-item red white-text" href="#one!">
                    <h2>First Panel</h2>
                    <p className="white-text">This is your first panel</p>
                </div>
                <div className="carousel-item amber white-text" href="#two!">
                    <h2>Second Panel</h2>
                    <p className="white-text">This is your second panel</p>
                </div>
                <div className="carousel-item green white-text" href="#three!">
                    <h2>Third Panel</h2>
                    <p className="white-text">This is your third panel</p>
                </div>
                <div className="carousel-item blue white-text" href="#four!">
                    <h2>Fourth Panel</h2>
                    <p className="white-text">This is your fourth panel</p>
                </div>
            </div>
            <a className="transparent btn-large" style={{ position: "absolute", left: "45%", top: "90rem" }} href="#1">Back to Top</a>
        </section>
    )
}

export default carousel;