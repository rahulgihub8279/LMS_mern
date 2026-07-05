import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice.js";

const useGetPublishedCourses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourseData = async () => {
      try {
        const courses = await axios.get(
          `${serverUrl}/api/course/get-published`,
          { withCredentials: true },
        ); 
        dispatch(setCourseData(courses.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    getCourseData();
  },[]);
};

export default useGetPublishedCourses;
