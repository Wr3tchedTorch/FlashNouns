import axios from "axios";
const baseURL = "http://localhost:3000/api/login";

const login = async (username, password) => {
    const response = await axios.post(baseURL, {username, password});
    return response.data;
}

export default {login};