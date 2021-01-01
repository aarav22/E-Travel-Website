import Axios from "axios";
import React, {useState} from "react";
import { useSelector} from 'react-redux';



const data = {
  name: "NA",
  mail: "NA",
  contact: "NA",
  dob: new Date(),
  city: "NA"
}

export default function Overview(props) {

  const [contact, setContact] = useState("");
  const userProfile = useSelector(state => state.user.curr_user);
  


  function updateContact() {
    console.log("q")
    // setContact(document.getElementsByClassName("contact-input")[0]["value"])
    Axios({
      method: "POST",
      url: `/api/update_user`,
      data: {contact: contact, address: []}
    })
      .then(response => console.log("Response from account overview: ", response))
      .catch(err => console.log("Update contact error: ", err))
  }

  return (
    <div className="over-sec">
      <h3 className="over-title">Profile Info</h3>
      <table className="over-info">
        <tbody>
          <tr className="over-table-row">
            <td className="table-something">Username</td>
            <td className="table-otherthing">{(userProfile) ? userProfile.name : data.name}</td>
          </tr>
          <tr className="over-table-row">
            <td className="table-something">E-mail Id</td>
            <td className="table-otherthing">{(userProfile) ? userProfile.email : data.mail}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
