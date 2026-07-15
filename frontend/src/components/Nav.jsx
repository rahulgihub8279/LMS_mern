import { IoPersonCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice.js";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { GrClose } from "react-icons/gr";

export default function Nav() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showHem, setShowHem] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      toast.success("logout successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full h-18 z-50  mt-0 top-1 fixed rounded-full px-5 py-2 flex items-center justify-between bg-[#e9ecef]/20 backdrop-blur-sm shadow-lg border-blue-800/30">
      <Link
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        className="text-white flex items-center lg:pl-5 px-4 py-2 rounded-3xl bg-[#0a0f09f4]"
      >
        <span className="font-extrabold text-2xl">Course</span>
        <span className="font-extrabold text-2xl">
          Budd<span>Y</span>
        </span>
      </Link>
      {/* {"right"} */}
      <div className="w-auto items-center justify-center hidden md:flex gap-7 bg-transparent px-8 py-2 rounded-4xl">
        {userData?.photoUrl && (
          <img
            src={userData.photoUrl}
            alt=""
            className="w-[43px] h-[43px] rounded-full text-white flex items-center justify-center text-[20px] bg-black cursor-pointer active:scale-95 transition-all duration-200 hover:scale-105"
            onClick={() => setShow(!show)}
          />
        )}
        {!userData?.photoUrl && userData?.name && (
          <div
            className="w-[43px] h-[43px] rounded-full text-white flex items-center justify-center text-[20px] border  bg-black cursor-pointer active:scale-95 transition-all duration-200"
            onClick={() => setShow(!show)}
          >
            {userData?.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        {userData?.role === "educator" && (
          <div
            className="px-4 py-2  text-white bg-black rounded-4xl cursor-pointer font-light"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        )}
        {!userData ? (
          <Link
            to={"/login"}
            className="px-4 py-2 border border-white text-white bg-black rounded-4xl cursor-pointer font-light"
          >
            Login
          </Link>
        ) : (
          <div
            className="px-4 py-2 border border-black shadow-black shadow-sm text-white bg-red-500 rounded-4xl cursor-pointer font-light"
            onClick={handleLogout}
          >
            Logout
          </div>
        )}

        {/* user profile menu */}
        {userData && (
          <div
            className={`fixed flex flex-col items-center justify-center cursor-pointer top-20 right-0   rounded shadow-black shadow-sm text-black gap-1 w-[25%] px-2 py-2 ease-in-out ${show ? "-translate-x-15 transition duration-300 bg-zinc-100" : "translate-x-full opacity-0  transition duration-300"}`}
          >
            <span
              className="transition duration-200 hover:bg-gray-400 rounded font-semibold text-[14px] w-full py-2 px-3"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </span>
            <span
              className="transition duration-200 hover:bg-gray-400 rounded font-semibold w-full text-[14px] py-2 px-3"
              onClick={() => navigate("/my-courses")}
            >
              My Courses
            </span>
          </div>
        )}
      </div>
      <MdMenu
        size={35}
        className="md:hidden absolute right-5 cursor-pointer"
        onClick={() => setShowHem(!showHem)}
      />
      {/* menu div  */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen items-center justify-center bg-zinc-300 flex flex-col md:hidden gap-6 z-5 ${showHem ? "translate-x-0 transition duration-500" : "-translate-x-full transition duration-500"}`}
      >
        <GrClose
          size={30}
          className={`absolute right-10 top-9 ${!showHem ? "rotate-360" : "rotate-0"} transition-all duration-100`}
          onClick={() => setShowHem(!showHem)}
        />
        {userData?.photoUrl ? (
          <img
            src={userData.photoUrl}
            alt=""
            className="w-[43px] h-[43px] rounded-full text-white flex items-center justify-center text-[20px] bg-black cursor-pointer active:scale-95 transition-all duration-200 hover:scale-105"
            onClick={() => setShow(!show)}
          />
        ) : (
          <div
            className="w-[43px] h-[43px] rounded-full text-white flex items-center justify-center text-[20px] border  bg-black cursor-pointer active:scale-95 transition-all duration-200"
            onClick={() => setShow(!show)}
          ></div>
        )}
        <span
          className="w-[60%] text-center flex items-center justify-center h-[10%] border border-white text-white bg-black rounded-md cursor-pointer font-light hover:bg-zinc-500 hover:text-black transition duration-200"
          onClick={() => navigate("/profile")}
        >
          My Profile
        </span>
        <span className="w-[60%] text-center flex items-center justify-center h-[10%] border border-white text-white bg-black rounded-md cursor-pointer font-light hover:bg-zinc-500 hover:text-black transition duration-200">
          My Courses
        </span>
        {userData?.role === "educator" && (
          <div
            className="w-[60%] text-center flex items-center justify-center h-[10%] border border-white text-white bg-black rounded-md cursor-pointer font-light hover:bg-zinc-500 hover:text-black transition duration-200"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </div>
        )}
        {!userData ? (
          <>
            <Link
              to={"/login"}
              className="w-[60%] text-center flex items-center justify-center h-[10%] px-4 py-2 border border-white text-white bg-black rounded-md cursor-pointer font-light hover:bg-zinc-500 hover:text-black transition duration-200"
            >
              Login
            </Link>
          </>
        ) : (
          <div
            className="w-[60%] text-center flex items-center justify-center h-[10%] px-4 py-2 border border-black shadow-black shadow-sm text-white bg-red-500 rounded-md cursor-pointer font-light hover:bg-zinc-500 hover:text-black transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
}
