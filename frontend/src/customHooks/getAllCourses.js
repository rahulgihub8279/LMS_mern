import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setAllCourse } from "../redux/courseSlice";
import { useEffect } from "react";

const useGetAllCourses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const allCourses = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/course/all-courses`,
          {
            withCredentials: true,
          },
        );
        dispatch(setAllCourse(response.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    allCourses();
  }, []);
};

export default useGetAllCourses;
