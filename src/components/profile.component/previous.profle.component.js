import React from "react";

const data = [
  {
    id: 12,
    to: "DEL",
    from: "BOM",
    dep_date: "21122020",
    dep: "1230",
    arr_date: "21122020",
    arr: "1130",
    price: "10000"
  },
  {
    id: 23,
    to: "DEL",
    dep_date: "21122020",
    from: "BOM",
    dep: "1230",
    arr_date: "21122020",
    arr: "1130",
    price: "10000"
  },
  {
    id: 34,
    to: "DEL",
    dep_date: "21122020",
    from: "BOM",
    dep: "1230",
    arr_date: "21122020",
    arr: "1130",
    price: "10000"
  }
]

const HistoryCard = (props) => {
  return (
    <div className="card-container">
      <div className="card-left">
        <h6 className="airline-no">AI 121</h6>
        <h6 className="pass-name">Argha Chakrabarty</h6>
      </div>
      <div className="card-mid">
        <h5 className="dep">DEPARTURE</h5>
        <div className="right-date">{props.object.dep_date}</div>
        <div className="right-time">{props.object.dep}</div>
        <div className="right-place">{props.object.from}</div>
      </div>
      <div className="card-left">
        <h5 className="arr">ARRIVAL</h5>
        <div className="left-date">{props.object.arr_date}</div>
        <div className="left-time">{props.object.arr}</div>
        <div className="left-place">{props.object.to}</div>
      </div>
      <div className="card-price">
        <div className="total-price">{props.object.price}</div>
      </div>
    </div>
  )
}


const Previous = () => {
  return (
    <div className="previous-container">
      {
        data.map((item) =>
          <HistoryCard object={item} key={item.id}></HistoryCard>
        )
      }
    </div>
  )
}

export default Previous;
