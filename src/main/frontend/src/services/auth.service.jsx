import axios from "axios";
import qs from 'qs';
import authHeader from './auth-header.jsx';
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const API_URL = "http://localhost:8080/api/";

//Sign Up post data
const register = (username, email, password) => {
  return axios({
    method: 'post',
    url: 'api/user/add',
    data: JSON.stringify({
      'username':username,
      'email':email,
      'password':password
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
};

//Sign in to get token and save to localstorage
const login = async(email, password) => {
  return axios({
    method: 'post',
    url: 'api/login',
    data: qs.stringify({
      email: email,
      password: password
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
  }).then((response) => {
    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data.access_token));
      localStorage.setItem(
          "refresh_token",
          JSON.stringify(response.data.refresh_token)
      );
    }
  });
};

//Validate token is is expired or not
const validatorToken = async(token) => {
  return axios({
    method: 'post',
    url: 'api/user/check-token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
  }).then((response) => {
    if (response.data.status_token) {
      localStorage.setItem("tokenStatus", true);
    } else {
      localStorage.setItem("tokenStatus", false);
    }
  });
}

// const getRefreshToken = () => {
//   return axios({
//     method: 'get',
//     url: API_URL + 'user/token/refresh',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//       'Authorization': "Bearer " + localStorage.getItem("user").split("\"")[1]
//     }
//   }).then(
//     (response) => {
//       if (response.data.access_token) {
//         localStorage.setItem("user", JSON.stringify(response.data.access_token));
//         localStorage.setItem(
//           "refresh_token",
//           JSON.stringify(response.data.refresh_token)
//         );
//       } 
//     },
//     (error) => {
//       console.log(error.message)
//     }
//   );
// };

//End Session of user and remove user from localstorage
const logout = () => {
  localStorage.removeItem("tokenStatus");
  localStorage.removeItem("user");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("fullname");
  return true;
};

//Get token user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

//Get details user
const getDetailUser = () => {
  if(localStorage.getItem("user")){
    return jwtDecode(localStorage.getItem("user"));
  }
  return false;
}

//Get current user email
const getCurrentEmail = () => {
  if(localStorage.getItem("user")) {
    return jwtDecode(localStorage.getItem("user")).sub;
  }
  return false;
}

const getUsername = () => {
  let email = getCurrentEmail()
  return axios({
    method: 'get',
    url: API_URL+'user/getUserByEmail/' + email,
    headers: {
      'content-type': 'application/json'
    }
  }).then((response) => {
        localStorage.setItem("username", response.data.data.username);
      }
  )
}

//Get current user role
const getCurrentRole = () => {
  if(localStorage.getItem("user")) {
    return jwtDecode(localStorage.getItem("user")).roles[0];
  }
  return false;
}

const userCheckAuth = () => {
  if(localStorage.getItem("user") === null) {
    useNavigate("/signin");
  }
  return false;
}

const getStatusCandidate = () => {
  let email = getCurrentEmail()
  return axios({
    method: 'get',
    url: API_URL+'user/getUserByEmail/' + email,
    headers: {
      'content-type': 'application/json'
    }
  }).then(
      (response) => {
        if(response.data.status === "404"){
          // console.log("candidate not found");
          useNavigate("/profile")
        } else {
          // console.log("candidate found");
          useNavigate("/home")
        }
      },
      (error) => {
        console.log(error)
      }
  )
}

export default {
  register,
  login,
  logout,
  validatorToken,
  getCurrentUser,
  getDetailUser,
  getCurrentEmail,
  getCurrentRole,
  userCheckAuth,
  getUsername,
  getStatusCandidate
  // getRefreshToken
};
