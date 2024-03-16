import {atom} from "recoil";

export interface Course{
    courseId : number,
	courseName : string,
	courseDesc : string,
	coursePrice: number,
	courseImage : string,
	published : boolean
}

export const roleState = atom({
    key : 'roleState',
    default : false
})

export const courseState = atom<{isLoading: boolean, course: Course | null}>({
    key: 'courseState',
    default: {
      isLoading: true,
      course: null
    },
  });

  export const drawerState = atom({
    key : 'drawerState',
    default : true
})