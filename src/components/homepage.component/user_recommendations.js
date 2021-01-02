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

const carousel = (props) => {
  {console.log("fffffffffffffffffffffffffffffffffffffffffffff", props)}

  useEffect(() => {
    M.Carousel.init(document.querySelectorAll(".carousel"), {
      fullWidth: true,
      indicators: true
    });
  }, []);

  return (
      (props.photosForCarousel).length ? 
        <div style={props.style} className="carousel carousel-slider center">
          {
            props.photosForCarousel.map((item, index) => {
              return (
                  <div key={index} className="carousel-item white-text">
                    <img src={item.photo_ref} alt="something" />
                    <h2>{data[0].offerObject.destCity}</h2>
                    <p className="white-text">This is your first panel</p>
                  </div>
              )
            }) 
          }
          </div>
          : 
          <div style={props.style} className="carousel carousel-slider center">{
            data.map((item, index) => {
              return (
                <div className="carousel-item white-text">
                    <img src={data[0].photo_ref} alt="something" />
                    <h2>{data[0].offerObject.destCity}</h2>
                    <p className="white-text">This is your second panel</p>
                  </div>
              )
            }) 
          }
          </div>
  )
}

export default carousel;