import { BASE_URL } from "@/config";
import axios from "axios";
const REST_API_BASE_URL_USER = BASE_URL+"/user";
import Cookies from 'js-cookie';

const header = { headers: { Authorization: `Bearer ${Cookies.get('jwtToken')}` } }

export const getpublishedCourse = () => {
    return axios.get(REST_API_BASE_URL_USER+"/courses", header);
}

export const getPurchasedCourseService = () => {
    const id = Cookies.get("id");
    return axios.get(REST_API_BASE_URL_USER+"/purchasedCourse/"+id, header);
}

export const getCourseById = (id : any) => {
    return axios.get(REST_API_BASE_URL_USER+`/getCourse/${id}`, header);
}

export const purchaseCourse = (mappedUserDto : any) =>{
    return axios.post(REST_API_BASE_URL_USER+"/purchase", mappedUserDto, header);
}