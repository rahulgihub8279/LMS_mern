import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";

export default function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-300 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-lg max-w-xl p-4 rounded-xl relative w-full ">
        <div className="flex relative gap-2 items-center justify-center">
          <div
            className="absolute left-0 top-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoArrowBackSharp className="w-8 h-8" />
          </div>
          <div className="flex flex-col items-center justify-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-black"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex justify-center items-center border-4 border-black">
                <span className="text-5xl">
                  {userData.name.slice(0, 1).toUpperCase()}
                </span>
              </div>
            )}
            <h2 className="text-2xl font-semibold mt-4 text-zinc-800">
              {userData?.name}
            </h2>
            <h2 className="text-md text-zinc-600 font-semibold ">
              {userData?.role}
            </h2>
          </div>
        </div>

        <div className="mt-6 space-y-2 flex items-start flex-col justify-center ms-2">
          <div className="text-sm">
            <span>Email : </span>
            <span>{userData.email}</span>
          </div>
          <div className="text-sm">
            <span>Bio : </span>
            <span>{userData.description}</span>
          </div>
          <div className="text-sm">
            <span>Enrolled Cources : </span>
            <span>{userData.enrolledCourses.length}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center gap-3">
          <div className="px-4 flex gap-1 py-2 rounded bg-black text-white cursor-pointer hover:bg-blue-800 transition duration-200 active:scale-97" onClick={()=>navigate("/editProfile")}>
            <FaUserEdit className="w-6" />{" "}
            <span className="text-[14px]">Edit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
