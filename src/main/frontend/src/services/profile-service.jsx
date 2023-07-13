import axios from "axios";
import authService from './auth.service.jsx';

const API_URL = "/api/";

const createProfile = (data, id) => {
    return axios({
        method: 'post',
        url: API_URL+'profile/' + id,
        data: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => {
        console.log(response)
    });
};

const getUserEmail = () => {
    let email = authService.getCurrentEmail()
    return axios({
        method: 'get',
        url: API_URL+'user/getDetailUserByEmail/' + email,
        headers: {
            'content-type': 'application/json'
        }
    })
}

const updateUser = async(data) => {
    let user = await getUserEmail()
    let id = user.data.data.candidate.id
    return axios({
        method: 'put',
        url: API_URL+'profile/' + id,
        data: data,
        headers: {
            'content-type': 'application/json'
        }
    })
}

export default {
    createProfile,
    getUserEmail,
    updateUser
};
