import axios from "axios";
const baseURL = "http://localhost:3000/api/users";

const getTopFive = async () => {
    const response = await axios.get(`${baseURL}/topFive`);
    console.log(response);
    return response.data;
}

const create = async (username, password) => {
    const response = await axios.post(baseURL, {username, password});
    console.log(response);
    return response.data;
}

const validateToken = async (token) => {
    const response = await axios.post(`${baseURL}/validateToken`, {token: token});    
    
    if (response.data.message.includes("error: token invalid.")) {
        return false;
    }
    return true;
}

export default {getTopFive, create, validateToken};