import Axios from "axios";
import React, {useState, useEffect} from "react";
import Navigation from "./navigation.profle.component"
import Overview from "./over.profile.component"
import Address from "./add.profile.component"

import "./profile.component.css"

export default function Profile(props) {
  const [current, setCurrent] = useState("over");
  const tabs = [
    {
      name: "over",
      label: "Account Overview",
      content: (<Overview user={props.user} />)
    },
    {
      name: "address",
      label: "Addresses",
      content: (<Address user={props.user} />)
    },
    {
      name: "orders",
      label: "Your Orders",
      content: (<div></div>)
    },
  ]

  return (
    <div className="profile-main">
      <div className="profile-title">
        My Account
      </div>
      <div className="profile-navigation">
        <img
          className="circle profile-img"
          src={(props.user) ? props.user.profile_picture : "https://www.w3schools.com/howto/img_avatar.png"}
          alt="profile pic"
          style={{"width": "150px"}} />
        {
          tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setCurrent(tab.name)}
              className={`profile-nav-button ${(tab.name === current) ? "profile-tab-active" : ""}`}>
              {tab.label}
            </button>
          ))
        }
      </div>

      {
        tabs.map((tab, i) => {
          if (tab.name === current) {
            return <div className="content-main" key={i}>{tab.content}</div>;
          } else {
            return null;
          }
        })
      }
    </div>
  )
}
