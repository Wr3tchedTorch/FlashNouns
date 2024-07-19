import axios from "axios";
const baseURL = "/api/login";

const login = async (username, password) => {
    const response = await axios.post(baseURL, {username, password});
    return response.data;
}

export default {login};