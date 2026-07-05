import google from "../assets/google.png";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, providor } from "../../utils/firebase";


export default function Signup() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password || !role) {
        toast.warn("all fields are required");
        return;
      }
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role },
        { withCredentials: true },
      );
      dispatch(setUserData(response.data));
      toast.success("signup successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, providor);
      let user = response.user;
      let Gname = user.displayName;
      let Gmail = user.email; 
      const createUser = await axios.post(
        `${serverUrl}/api/auth/googleauth`,
        { name: Gname, email: Gmail, role },
        { withCredentials: true },
      ); 
      dispatch(setUserData(createUser.data));
      toast.success("signup successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "something went wrong");
    }
  };
  return (
    <div className="bg-[#ded9d9] w-screen h-screen flex items-center justify-center p-4">
      <form
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* left div  */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">
          <h2 className="text-xl font-semibold">Let's get started</h2>
          <h2 className="text-zinc-500">Create your account</h2>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border w-full h-[35px] border-zinc-600 outline-none px-3 text-[15px]"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="flex md:w-[50%] w-[70%] items-center justify-between mt-3">
            <span
              className={`px-2.5 py-1.5 border-2 rounded-full  cursor-pointer hover:bg-zinc-300 transition-all ${role === "student" ? "border-black" : "border-zinc-300"}`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-2.5 py-1.5 border-2 rounded-full  cursor-pointer  hover:bg-zinc-300 transition-all ${role === "educator" ? "border-black" : "border-zinc-300"}`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>
          <button
            type="button"
            className="w-[75%] text-white mt-2 rounded bg-black p-3 text-sm cursor-pointer items-center justify-center"
            disabled={loading}
            onClick={handleSignup}
          >
            {loading ? (
              <ClipLoader size={15} color="white"></ClipLoader>
            ) : (
              "Sign up"
            )}
          </button>
          <div className="flex gap-2 items-center w-[80%]">
            <div className="w-[48%] h-[1px] bg-zinc-500"></div>
            <div className="text-zinc-500">or</div>
            <div className="w-[48%] h-[1px] bg-zinc-500"></div>
          </div>
          <div
            className="w-[75%] mt-2 rounded text-zinc-500 p-3 flex items-center justify-around text-sm shadow-lg border-zinc-300 border cursor-pointer"
            onClick={googleSignup}
          >
            <img src={google} alt="" className="w-[7%]" />
            <span className="mr-10">Sign up with Google</span>
          </div>
          <div className="text-sm text-zinc-600">
            already have an account ?{" "}
            <span
              className="text-blue-700 underline underline-offset-1 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              login
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
