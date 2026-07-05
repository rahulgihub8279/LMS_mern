import { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice.js";

const useGetCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/course/get-creator`,
          {
            withCredentials: true,
          },
        );  
        dispatch(setCreatorCourseData(response.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    creatorCourses();
  }, [userData]);
};

export default useGetCreatorCourse;
