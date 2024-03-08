import axios from "axios";

const REST_API_BASE_URL_HOME = "http://localhost:8080/home";
export interface userDto {
    name : string,
    email : string,
    password : string,
    roles : string
}

export interface loginDto {
    username : string,
    password : string
}
export const createUser = (userDto : userDto) => {
    return axios.post(REST_API_BASE_URL_HOME+"/signup", userDto);
}

export const login = (loginDto : loginDto) => {
    return axios.post(REST_API_BASE_URL_HOME+"/login", loginDto);
}

export const userExits = (userName : string) => {
    return axios.get(REST_API_BASE_URL_HOME+"/userExist/"+userName);
}

export const changePassword = (loginDto : loginDto) => {
    return axios.put(REST_API_BASE_URL_HOME+"/changePassword",loginDto);
}