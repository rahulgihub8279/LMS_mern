import { useState } from "react";
import google from "../assets/google.png";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, providor } from "../../utils/firebase";

export default function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        toast.warn("all fields are required");
        return;
      }
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      dispatch(setUserData(response.data.user));
      toast.success("welcome back");
      navigate("/");
    } catch (err) { 
      toast.error(err?.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, providor);
      let user = response.user;
      let gname =user.displayName
      let Gmail = user.email;
      let role = ""
      const createUser = await axios.post(
        `${serverUrl}/api/auth/googleauth`,
        { name:gname,email: Gmail,role },
        { withCredentials: true },
      );
      dispatch(setUserData(createUser.data));
      toast.success("welcome back");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "something went wrong");
    }
  };
  return (
    <div className="bg-[#ded9d9] w-screen h-screen flex items-center justify-center p-4">
      <form
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex "
        onSubmit={(e) => e.preventDefault()}
        s
      >
        {/* left div  */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-semibold">Welcome back</h2>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="border w-full h-[35px] border-zinc-600 outline-none px-3 text-[15px]"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              className="border w-full h-[35px] border-zinc-600 outline-none px-3 text-[15px]"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? (
              <IoEye
                className="absolute right-[20px] bottom-[10px] cursor-pointer"
                onClick={() => setShow(!show)}
              />
            ) : (
              <IoMdEyeOff
                className="absolute right-[20px] bottom-[10px] cursor-pointer"
                onClick={() => setShow(!show)}
              />
            )}
          </div>

          <button
            className="w-[75%] text-white mt-2 rounded bg-black p-3 text-sm cursor-pointer"
            type="submit"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? (
              <ClipLoader size={15} color="white"></ClipLoader>
            ) : (
              "Login"
            )}
          </button>
          <div className="flex gap-2 items-center w-[80%]">
            <div className="w-[48%] h-[1px] bg-zinc-500"></div>
            <div className="text-zinc-500">or</div>
            <div className="w-[48%] h-[1px] bg-zinc-500"></div>
          </div>
          <div
            className="w-[75%] mt-2 rounded text-zinc-500 p-3 flex items-center justify-around text-sm shadow-lg border-zinc-300 border cursor-pointer"
            onClick={googleLogin}
          >
            <img src={google} alt="" className="w-[7%]" />
            <span className="mr-10">Continue with Google</span>
          </div>
          <div className="text-sm text-zinc-600 mt-5">
            don't have account ?{" "}
            <span
              className="text-blue-700 underline underline-offset-1 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              signup
            </span>
          </div>
        </div>

        {/* right div  */}
        <div className="w-[50%] bg-black rounded-r-2xl h-full hidden md:flex items-center justify-center flex-col">
          <span className="text-white text-4xl font-semibold">
            COURSE BUDDY
          </span>
          <span className="text-white text-sm">Take You Forward.</span>
        </div>
      </form>
    </div>
  );
}
