/* eslint-disable */
import React, {useEffect} from "react";
import M from "materialize-css";

const data = [
  {
    "offerObject": {
      "origin": "Delhi",
      "destCity": "Indore",
      "departureDate": "2021-05-14",
      "returnDate": "2021-05-17",
      "price": "4869.00"
    },
    "photo_ref": "https://picsum.photos/400/200"
  }
]

const crousel = (props) => {
  {console.log("fffffffffffffffffffffffffffffffffffffffffffff", props)}

  useEffect(() => {
    M.Carousel.init(document.querySelectorAll(".carousel"), {
      fullWidth: true,
      indicators: true
    });
  }, []);

  return (

    <div style={props.style} className="carousel carousel-slider center">
      {/*
        (props.photosForCarousel ? props.photosForCarousel : data).map((item, index) => {
          console.log("gggggggggggggggg", item)
          return (
            <div key={index} className="carousel-item white-text">
              <img src={data[0].photo_ref} alt="something" />
              <h2>{data[0].offerObject.destCity}</h2>
              <p className="white-text">This is your first panel</p>
            </div>
          )
        }
        )
        */}
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
  )
}

export default crousel;
