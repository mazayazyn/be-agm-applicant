import axios from "axios";
import { useNavigate, useState } from "react-router-dom";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";
const [message, setMessage] = useState("")

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getRefreshToken
};