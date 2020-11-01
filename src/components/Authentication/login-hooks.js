import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './refresh-tokens'; // refresh token
import {userSignedIn} from './usersSlice'
import { useDispatch, useSelector } from 'react-redux';
import "./auth.css"


const clientId =
    process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginHooks() {
    const dispatch = useDispatch(); 
    var isSignedIn = useSelector(state => state.user.isSignedIn); 
    var user = useSelector(state => state.user.curr_user);
    // console.log("isSignedIn", isSignedIn);
    // console.log("user: ", user);

    const onSuccess = (response) => {
        console.log('Login Success: currentUser:', response.profileObj);
        alert(
            `Logged in successfully welcome ${response.profileObj.name} . \n See console for full profile object.`
        );

        axios({
            method: "POST",
            url: 'http://localhost:5000/api/login',
            data: { tokenId: response.tokenId }
        }).then(res => {
            dispatch(userSignedIn(res)); 
            console.log(res);
            // console.log("Var inside: ", isSignedIn, res.data.user._id);
        })
            .catch(err => console.log("Error from succesfulResponseGoogle", err));
        refreshTokenSetup(response);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
    });

    return (
        <li className="nav-item nav-login">
            <button onClick={signIn} className="nav-login-button">
                <i className='fa fa-user'></i>
                <span className="nav-login-text">Login</span>
            </button>

        </li>
    );
}

export default LoginHooks;