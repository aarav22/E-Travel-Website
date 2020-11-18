import React from "react";

import "./hotel-page.component.css";

const data = [
  {
    "name": "Hyatt Regency",
    "city": "Ahmedabad",
    "price": 5159,
    "review": 8.7,
    "address": "Plot 216, Town Plan Scheme 1, Near Vastrapur Lake, Vastrapur , Vastrapur, Ahmedabad",
  },
  {
    "name": "Hyatt Regency",
    "city": "Ahmedabad",
    "price": 5159,
    "review": 8.7,
    "address": "Plot 216, Town Plan Scheme 1, Near Vastrapur Lake, Vastrapur , Vastrapur, Ahmedabad",
  },
  {
    "name": "Hyatt Regency",
    "city": "Ahmedabad",
    "price": 5159,
    "review": 8.7,
    "address": "Plot 216, Town Plan Scheme 1, Near Vastrapur Lake, Vastrapur , Vastrapur, Ahmedabad",
  },
  {
    "name": "Hyatt Regency",
    "city": "Ahmedabad",
    "price": 5159,
    "review": 8.7,
    "address": "Plot 216, Town Plan Scheme 1, Near Vastrapur Lake, Vastrapur , Vastrapur, Ahmedabad",
  }
]

const HotelPage = () => {
  return (
    <div className="hotel-page-container">
      <div className="hotel-page-info">
        <input className="hotel-page-search" placeholder="enter city"></input>
        <div>check-in</div>
        <div>check-out</div>
        <div>Guests</div>
        <button>Search</button>
      </div>
      <div className="hotel-list">
        {
          data.map((hotel) => {
            return (
              <div className="hotel-card">
                <svg className="hotel-img" fill="white" width="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M501.8 148.3H388.7V30.2c0-5.6-4.6-10.2-10.2-10.2H133.5c-5.6 0-10.2 4.6-10.2 10.2v118.2H10.2C4.6 148.3 0 152.9 0 158.5v323.3c0 5.6 4.6 10.2 10.2 10.2h491.6c5.6 0 10.2-4.6 10.2-10.2v-323.3C512 152.9 507.4 148.3 501.8 148.3zM123.3 471.6H20.4V168.7h102.9V471.6zM293.7 471.6h-27.5v-27.8c0-5.6-4.6-10.2-10.2-10.2 -5.6 0-10.2 4.6-10.2 10.2v27.8h-27.5v-76.8h75.4V471.6zM368.3 471.6h-54.3v0 -87c0-5.6-4.6-10.2-10.2-10.2h-95.8c-5.6 0-10.2 4.6-10.2 10.2v87h-54.3V40.4H368.3V471.6zM491.6 471.6H388.7V168.7h102.9V471.6z" /><path d="M233 163.2h-58.2c-5.6 0-10.2 4.6-10.2 10.2v58.2c0 5.6 4.6 10.2 10.2 10.2h58.2c5.6 0 10.2-4.6 10.2-10.2v-58.2C243.2 167.7 238.6 163.2 233 163.2zM222.8 221.4h-37.8v-37.8h37.8V221.4z" /><path d="M337.2 163.2h-58.2c-5.6 0-10.2 4.6-10.2 10.2v58.2c0 5.6 4.6 10.2 10.2 10.2h58.2c5.6 0 10.2-4.6 10.2-10.2v-58.2C347.4 167.7 342.9 163.2 337.2 163.2zM327 221.4h-37.8v-37.8h37.8V221.4z" /><path d="M468 183h-56.2c-5.6 0-10.2 4.6-10.2 10.2v56.2c0 5.6 4.6 10.2 10.2 10.2h56.2c5.6 0 10.2-4.6 10.2-10.2v-56.2C478.2 187.6 473.6 183 468 183zM457.8 239.2h-35.8v-35.8h35.8V239.2z" /><path d="M468 282.4h-56.2c-5.6 0-10.2 4.6-10.2 10.2v56.2c0 5.6 4.6 10.2 10.2 10.2h56.2c5.6 0 10.2-4.6 10.2-10.2v-56.2C478.2 287 473.6 282.4 468 282.4zM457.8 338.6h-35.8V302.8h35.8V338.6z" /><path d="M468 382h-56.2c-5.6 0-10.2 4.6-10.2 10.2v56.2c0 5.6 4.6 10.2 10.2 10.2h56.2c5.6 0 10.2-4.6 10.2-10.2v-56.2C478.2 386.5 473.6 382 468 382zM457.8 438.1h-35.8V402.4h35.8V438.1z" /><path d="M99.8 183H43.7c-5.6 0-10.2 4.6-10.2 10.2v56.2c0 5.6 4.6 10.2 10.2 10.2h56.2c5.6 0 10.2-4.6 10.2-10.2v-56.2C110 187.6 105.4 183 99.8 183zM89.6 239.2H53.9v-35.8h35.8V239.2z" /><path d="M99.8 282.4H43.7c-5.6 0-10.2 4.6-10.2 10.2v56.2c0 5.6 4.6 10.2 10.2 10.2h56.2c5.6 0 10.2-4.6 10.2-10.2v-56.2C110 287 105.4 282.4 99.8 282.4zM89.6 338.6H53.9V302.8h35.8V338.6z" /><path d="M99.8 382H43.7c-5.6 0-10.2 4.6-10.2 10.2v56.2c0 5.6 4.6 10.2 10.2 10.2h56.2c5.6 0 10.2-4.6 10.2-10.2v-56.2C110 386.5 105.4 382 99.8 382zM89.6 438.1H53.9V402.4h35.8V438.1z" /><path d="M233 266.5h-58.2c-5.6 0-10.2 4.6-10.2 10.2v58.2c0 5.6 4.6 10.2 10.2 10.2h58.2c5.6 0 10.2-4.6 10.2-10.2v-58.2C243.2 271 238.6 266.5 233 266.5zM222.8 324.7h-37.8v-37.8h37.8V324.7z" /><path d="M337.2 266.5h-58.2c-5.6 0-10.2 4.6-10.2 10.2v58.2c0 5.6 4.6 10.2 10.2 10.2h58.2c5.6 0 10.2-4.6 10.2-10.2v-58.2C347.4 271 342.9 266.5 337.2 266.5zM327 324.7h-37.8v-37.8h37.8V324.7z" /><path d="M256 404.5c-5.6 0-10.2 4.6-10.2 10.2v0.9c0 5.6 4.6 10.2 10.2 10.2 5.6 0 10.2-4.6 10.2-10.2v-0.9C266.2 409.1 261.6 404.5 256 404.5z" /><path d="M275.4 65.3c-4 0-8.1 1.4-8.1 4.9v25.3h-20.5V70.1c0-3.4-4-4.9-8.1-4.9 -4 0-8.1 1.4-8.1 4.9v65.7c0 3.3 4 5 8.1 5 4 0 8.1-1.7 8.1-5V107.8h20.5v28c0 3.3 4 5 8.1 5 4 0 8.1-1.7 8.1-5V70.1C283.4 66.7 279.4 65.3 275.4 65.3z" /></svg>
                <div className="hotel-name">{hotel.name}</div>
                <div className="hotel-address">{hotel.address}</div>
                <div className="hotel-rating">Review: {hotel.review}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default HotelPage
