import React from 'react';

import { Link } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';
import {userSignedIn} from './usersSlice'
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

const clientId =
    process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LogoutHooks() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.curr_user) 
    const userId = user ? user._id : ""; 

    const onLogoutSuccess = (res) => { 
        console.log('Logged out Success');
        alert('Logged out Successfully');
        axios({
            method: "POST",
            url: "http://localhost:5000/api/logout",
            data: { userId: userId }
        }).then(res => {
            let userObject = {user: res.data.user, isSignedIn: res.data.isSignedIn}
            dispatch(userSignedIn(userObject)); 
        }).catch(err => console.log("error from logout: ", err))
    };

    const onFailure = () => {
        console.log("Logout Failed!")
    };

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    return (
        <li className="nav-item nav-login logout has-dropdown">
            <a className="nav-logout-button" href="#">
                <img className="nav-profile-pic" alt="profile" src={user["profile_picture"]}></img>
            </a>
            <ul className="nav-dropdown">
                <li className="nav-dropdown-item">
                    <Link to='/profile'>Profile</Link>
                </li>
                <li className="nav-dropdown-item">
                    <Link to="/add">Address</Link>
                </li>
                <li className="nav-dropdown-item">
                    <a id="logout" onClick={signOut} href="#">Logout</a>
                </li>
            </ul>
        </li>
    );
}

export default LogoutHooks;