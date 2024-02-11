import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/home";

export const createUser = (userDto) => {
    return axios.post(REST_API_BASE_URL+"/signup", userDto);
}