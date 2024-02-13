import axios from "axios";

const REST_API_BASE_URL_HOME = "http://localhost:8080/home";

export const createUser = (userDto) => {
    return axios.post(REST_API_BASE_URL_HOME+"/signup", userDto);
}

export const login = (loginDto) => {
    return axios.post(REST_API_BASE_URL_HOME+"/login", loginDto);
}

export const userExits = (userName) => {
    return axios.get(REST_API_BASE_URL_HOME+"/userExist/"+userName);
}

export const changePassword = (loginDto) => {
    return axios.put(REST_API_BASE_URL_HOME+"/changePassword",loginDto);
}