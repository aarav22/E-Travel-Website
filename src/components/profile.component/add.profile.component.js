import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {userSignedIn} from '../Authentication/usersSlice'
import "./profile.component.css"

export default function Address() {
    const dispatch = useDispatch(); 
    // var user = {
    //     address: [{name: "Home", address: "E-14 DOS Colony"}, {name: "office", address: "E-14 DOS Colony"}, {name: "matrix", address: "E-14 DOS Colony"}]
    // }

    const user = useSelector(state => state.user.curr_user); 
    console.log("user from profile: ", user); 

    // const [user, setUser] = useState(useSelector(state => state.user.curr_user));
    const [address, setAdd] = useState(false);
    const [usrAdd, setUsrAdd] = useState(null);
    // console.log("userAdd: ", usrAdd);
    const [newAdd, setnewAdd] = useState({name: "", address: ""});

    useEffect(() => {
        setUsrAdd(user? user.address: null); 
    }, [user]) 


    function updateAddress() {
        console.log("Update: ", usrAdd); 
        axios({
            method: "POST",
            url: `http://localhost:5000/api/update_adress`,
            data: { userId: user._id, address: usrAdd }
        })
        
            .then(res => {
                let userObject = {user: res.data.user, isSignedIn: true}
                dispatch(userSignedIn(userObject)); 
            })
            .catch(err => console.log("Update address error: ", err));
    }

    function deleteAddress(addressName) {
        console.log("Update: ", usrAdd); 
        axios({
            method: "POST",
            url: `http://localhost:5000/api/delete_adress`,
            data: { userId: user._id, name: addressName }
        })
            .then(res => {
                let userObject = {user: res.data.user, isSignedIn: true}
                dispatch(userSignedIn(userObject)); 
            })
            .catch(err => console.log("Delete address error: ", err));
    }


    return(
        <div className="addr-main">
            <h3 className="addr-title">Addresses</h3>
            <div className="addr-container">
                {(user?user.address:[] ).map((addr) => { 
                    return(
                        <div key={addr.name} className="addr-content">
                            <div className="addr-bar">
                                <div>{addr.name}</div>
                                <div className="addr-btns">
                                    <button className="addr-button" onClick={() => deleteAddress(addr.name)}><i className="far fa-trash-alt"></i></button>
                                    {/* <button className="addr-button"><i className="fas fa-pen"></i></button> */}
                                </div>
                            </div>
                            <div className="addr-addr">{addr.address}</div>
                        </div>
                    )
                })}
                {
                    address && (
                        <div className="addr-content-add">
                            <div className="addr-bar-add">
                                <input className="addr-title-add" placeholder="Title" onChange={(e) => {setnewAdd({...newAdd, name: e.target.value}); console.log(newAdd);}}></input>
                                <div className="addr-btns-add">

                                    <button className="addr-button-add" onClick={() => {setAdd(!address)}}><i className="far fa-trash-alt" ></i></button>

                                    <button className="addr-button-add"
                                        onClick={() => {setUsrAdd(usrAdd => [...usrAdd, newAdd]);   }}
                                    >✔</button>
                                    <button className="addr-button-something-else"
                                        onClick={() => {updateAddress(); setAdd(!address)} }
                                        style={{backgroundColor:"transparent", border:"none"}}
                                    >💾</button>
                                </div>
                            </div>
                            <input placeholder="Address" className="addr-addr-add" onChange={(e) => { setnewAdd({ ...newAdd, address: e.target.value }); console.log(newAdd);}}></input>
                        </div>
                    )
                }
                <button className="add-more" style={{ width: "5rem", height: "auto" }} onClick={() => {setAdd(!address)}}>
                    <svg className="add-more-sign" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.3 492.3"><polygon points="256 236.3 256 110 236.3 110 236.3 236.3 110 236.3 110 256 236.3 256 236.3 382.4 256 382.4 256 256 382.4 256 382.4 236.3 " /><path d="M246.2 0C110.4 0 0 110.4 0 246.2s110.4 246.2 246.2 246.2 246.2-110.4 246.2-246.2S381.9 0 246.2 0zM246.2 472.6c-124.9 0-226.5-101.6-226.5-226.5S121.3 19.7 246.2 19.7s226.5 101.6 226.5 226.5S371 472.6 246.2 472.6z" /></svg>
                </button>
            </div>
            
        </div>
    )
}