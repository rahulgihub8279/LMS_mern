import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/user/get-current-user`,
          { withCredentials: true },
        );
        dispatch(setUserData(response.data));
      } catch (err) {
        console.log(err.message);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, []);
};
export default useCurrentUser;
