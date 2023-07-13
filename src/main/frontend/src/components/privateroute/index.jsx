import AuthService from "../../services/auth.service"
import React, {useEffect} from "react"
import {Navigate} from 'react-router-dom';
import jwtDecode from "jwt-decode";

const PrivateRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // console.log("ini status user")
    // console.log(user)
    if (user === undefined || user === false || user === null){
        return <Navigate to="/signin"></Navigate>
    } else {
        return children;
    }
};

export default PrivateRoute;
