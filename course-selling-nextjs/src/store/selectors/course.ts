import {selector} from "recoil";
import { courseState, drawerState, roleState } from "../atoms/course";

export const isUserBoolean = selector({
    key : "isUserState",
    get : ({get}) => {
        const state = get(roleState);
        return state;
    }
})

export const isDrawerBoolean = selector({
  key : "isDrawerState",
  get : ({get}) => {
      const state = get(drawerState);
      return state;
  }
})

export const isCourseLoading = selector({
    key: 'isCourseLoaingState',
    get: ({get}) => {
      const state = get(courseState);
  
      return state.isLoading;
    },
  });
  
  export const courseDesc = selector({
    key: 'courseDetailsState',
    get: ({get}) => {
      const state = get(courseState);
        if(state.course){
            return state.course.courseDesc;
        }
      return "";
    },
  });
  
  export const courseName = selector({
    key: 'courseTitleState',
    get: ({get}) => {
      const state = get(courseState);
      if (state.course) {
          return state.course.courseName;
      }
      return "";
    },
  });
  
  export const coursePrice = selector({
    key: 'coursePriceState',
    get: ({get}) => {
      const state = get(courseState);
      if (state.course) {
          return state.course.coursePrice;
      }
    },
  });
  
  export const courseImage = selector({
    key: 'courseImageState',
    get: ({get}) => {
      const state = get(courseState);
      if (state.course) {
          return state.course.courseImage;
      }
      return "";
    },
  });