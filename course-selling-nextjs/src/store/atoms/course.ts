import {atom} from "recoil";

export interface Course{
    courseId : number,
	courseName : string,
	courseDesc : string,
	coursePrice: number,
	courseImage : string,
	isPublished : boolean
}

export const roleState = atom({
    key : 'roleState',
    default : false
})

export const courseState = atom<{isLoading: boolean, course: null | Course}>({
    key: 'courseState',
    default: {
      isLoading: true,
      course: null
    },
  });