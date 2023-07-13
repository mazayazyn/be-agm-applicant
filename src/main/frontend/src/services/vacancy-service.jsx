import axios from "axios";
import authService from './auth.service.jsx';

const API_URL = "/api/";

const createAppliedJob = (idUser, idVacancy) => {
    return axios({
        method: 'post',
        url: API_URL+'create-userVacancy/' + idUser + '/' + idVacancy,
        headers: {
            'content-type': 'application/json'
        }
    })
};


const getUserId = () => {
    let email = authService.getCurrentEmail()
    return axios({
        method: 'get',
        url: API_URL+'user/getDetailUserByEmail/' + email,
        headers: {
            'content-type': 'application/json'
        }
    })}


export default {
    createAppliedJob,
    getUserId
};