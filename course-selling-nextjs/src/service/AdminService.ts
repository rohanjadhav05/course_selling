import { BASE_URL } from "@/config";
import axios from "axios";
const REST_API_BASE_URL_ADMIN = BASE_URL+"/admin";
import Cookies from 'js-cookie';

const header = { headers: { Authorization: `Bearer ${Cookies.get('jwtToken')}` } }

export const getAllcourses = () => {
    return axios.get(REST_API_BASE_URL_ADMIN+"/getAllCourse", header);
}


export const getCourseById = (courseId : any) => {
    return axios.get(REST_API_BASE_URL_ADMIN+`/getCourse/${courseId}`, header);
}

export const updateCourse = (courseDto : any) => {
    return axios.put(REST_API_BASE_URL_ADMIN+'/updateCourse',courseDto, header);
}

export const addCourse = (courseDto : any) => {
    return axios.post(REST_API_BASE_URL_ADMIN+"/addCourse", courseDto, header);
}

export const getCourseSales = () => {
    return axios.get(REST_API_BASE_URL_ADMIN+"/getAnaylsis",header);
}
