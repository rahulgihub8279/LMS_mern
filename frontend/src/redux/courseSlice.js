import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourseData: null,
    courseData: null,
    allCourses:null
  },
  reducers: {
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    setAllCourse: (state, action) => {
      state.allCourses = action.payload;
    },
  },
});

export const { setCreatorCourseData, setCourseData, setAllCourse } = courseSlice.actions;
export default courseSlice.reducer;
