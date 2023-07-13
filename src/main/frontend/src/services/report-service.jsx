import axios from "axios";

const API_URL = "/api/";

const createReport = (id, data) => {
    return axios.post(API_URL+'report/create-report/' + id, data);
};

const getAllReport = (id) => {
    return axios.get(API_URL+'report/getAllReportByVacancy/' + id);
};

const deleteReport = (id) => {
    return axios.delete(API_URL+'report/delete-report/' + id);
};

const viewReport = () => {
    return axios.get(API_URL + "user");
};

export default {
    getAllReport,
    createReport,
    viewReport,
    deleteReport
};