import React from 'react';
import axios from 'axios';
import { useGoogleLogout } from 'react-google-login';
import {userSignedIn} from './usersSlice'
import { useDispatch, useSelector } from 'react-redux';
import "./auth.css"

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
            dispatch(userSignedIn(res))
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
        <li className="nav-item nav-login">
        <button  onClick={signOut} className="nav-login-button">
        <img className="nav-profile-pic" src={user["profile_picture"]}></img>
            {/* <i className='fa fa-user'></i> */}
            <span className="nav-login-text">Logout</span>
        </button>
        
    </li>
    );
}

export default LogoutHooks;