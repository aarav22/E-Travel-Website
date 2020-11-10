import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './refresh-tokens'; // refresh token
import {userSignedIn} from './usersSlice'
import { useDispatch, useSelector } from 'react-redux';


const clientId =
    process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LoginHooks() {
    const dispatch = useDispatch(); 
    var isSignedIn = useSelector(state => state.user.isSignedIn); 
    var user = useSelector(state => state.user.curr_user);

    const onSuccess = (response) => {
        // console.log('Login Success: currentUser:', response.profileObj);
        alert(
            `Logged in successfully welcome ${response.profileObj.name} . \n See console for full profile object.`
        );

        axios({
            method: "POST",
            url: 'http://localhost:5000/api/login',
            data: { tokenId: response.tokenId }
        }).then(res => {
            let userObject = {user: res.data.user, isSignedIn: res.data.isSignedIn}
            dispatch(userSignedIn(userObject)); 
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
        <li className="nav-item nav-login login has-dropdown">
            <a className="nav-login-button" href="#">
                <svg className="login-ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="39.7" y="361.8" width="33.4" height="58.2" /><rect x="133.5" y="361.8" width="33.4" height="58.2" /><rect x="86.6" y="361.8" width="33.4" height="97" /><rect x="341.7" y="361.8" width="33.4" height="58.2" /><rect x="435.5" y="361.8" width="33.4" height="58.2" /><rect x="388.6" y="361.8" width="33.4" height="97" /><path d="M121.2 225.1c-26.8 0-48.7 21.8-48.7 48.7 0 26.8 21.8 48.7 48.7 48.7s48.7-21.8 48.7-48.7C169.8 246.9 148 225.1 121.2 225.1z" /><path d="M372.9 225.1c-26.8 0-48.7 21.8-48.7 48.7 0 26.8 21.8 48.7 48.7 48.7s48.7-21.8 48.7-48.7C421.5 246.9 399.7 225.1 372.9 225.1z" /><path d="M385.6 152.2l-49-99H104.1L55.6 151.1H0v139.3h40.8c-1.1-5.4-1.7-11-1.7-16.7 0-45.2 36.8-82.1 82.1-82.1s82.1 36.8 82.1 82.1c0 5.7-0.6 11.3-1.7 16.7h91c-1.1-5.4-1.7-11-1.7-16.7 0-45.2 36.8-82.1 82.1-82.1 45.2 0 82.1 36.8 82.1 82.1 0 5.7-0.6 11.3-1.7 16.7H512V165.5L385.6 152.2zM203.6 151.1H92.8l31.9-64.5h78.8V151.1zM237 151.1V86.6h78.8l31.9 64.5H237z" /></svg>
            </a>
            <ul className="nav-dropdown">
                <li className="nav-dropdown-item">
                    <a id="logout" onClick={signIn} href="#">Login</a>
                </li>
            </ul>
        </li>
    );
}

export default LoginHooks;