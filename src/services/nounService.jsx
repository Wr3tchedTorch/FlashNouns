import axios from "axios";
const baseUrl = "http://localhost:3000/api/nouns";

const getRandomNoun = async () => {
    const noun = await axios.get(`${baseUrl}/randomNoun`);    
    return noun;
}

const getNouns = async () => {
    const response = await axios.get(baseUrl);
    return response.data
}

export default {getRandomNoun, getNouns};