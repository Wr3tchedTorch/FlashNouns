import axios from "axios";
const baseURL = "/api/users";

const getTopFive = async () => {
    const response = await axios.get(`${baseURL}/topFive`);
    console.log(response);
    return response.data;
}

const create = async (username, password) => {
    const response = await axios.post(baseURL, {username, password});
    return response.data;
}

const updateScore = async (token, score) => {
    const response = await axios.patch(`${baseURL}/updateScore`, {token, score})
    return response.data;
}

const validateToken = async (token) => {
    const response = await axios.post(`${baseURL}/validateToken`, {token: token});       
    if (response.data.message.includes("error: token invalid.")) {
        return false;
    }
    return true;
}

const getUserScore = async (token) => {
    const response = await axios.post(`${baseURL}/getScore`, {token: token});       
    return response.data;
}

export default {getTopFive, create, validateToken, updateScore, getUserScore};