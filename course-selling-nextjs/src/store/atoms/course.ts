import {atom} from "recoil";

export interface Course{
    courseId : number,
	courseName : string,
	courseDesc : string,
	coursePrice: number,
	courseImage : string,
	isPublished : boolean
}