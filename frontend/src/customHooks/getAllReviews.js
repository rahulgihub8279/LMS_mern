import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice.js";

const useGetAllReviews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const allreviews = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/review/get-review`, {
          withCredentials: true,
        });
        dispatch(setReviewData(response.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    allreviews();
  }, []);
};

export default useGetAllReviews;
