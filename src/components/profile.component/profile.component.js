// import Axios from "axios";
import React, {useState} from "react";
import {useSelector} from 'react-redux';
import Previous from "./previous.profle.component"
import Overview from "./over.profile.component"
import Address from "./add.profile.component"

import "./profile.component.css"

export default function Profile(props) {
  const [current, setCurrent] = useState("over");
  const userProfile = useSelector(state => state.user.curr_user);

  const tabs = [
    {
      name: "over",
      label: "Profile Info",
      content: (<Overview />)
    },
    {
      name: "orders",
      label: "Previous Ventures",
      content: (<Previous></Previous>)
    },
    {
      name: "address",
      label: "Addresses",
      content: (<Address user={props.user} />)
    },
  ]

  return (
    <div className="profile-main">
      <div className="profile-title">
        My Account
      </div>
      <div className="profile-navigation">
        <img
          className="profile-img"
          src={(userProfile) ? userProfile.profile_picture : "https://www.w3schools.com/howto/img_avatar.png"}
          alt="profile pic"
        />
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
