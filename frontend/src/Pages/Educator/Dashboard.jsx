import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

export default function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <IoArrowBackSharp
        className="absolute left-[5%] top-[3%] w-7 h-7 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-full px-6 py-10  bg-[#e9ecef] space-y-10">
        {/* main section  */}
        <div className="mt-3 max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center  gap-6">
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-24 h-24 rounded-full object-cover border-2 border-black"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex justify-center items-center border-2 border-black">
              <span className="text-5xl">
                {userData.name.slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}
          <div className="text-center flex flex-col items-center md:items-start md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-zinc-800">
              Welcome, {userData?.name} 👋
            </h1>
            <h1 className="text-xl font-semibold text-zinc-800">
              Total Earning : 0
            </h1>
            <p className="text-zinc-600 text-sm">
              {userData?.description || "Start creating courses for studets"}
            </p>
            <div
              className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-[#10002b] text-white mt-3 text-sm cursor-pointer w-[50%] "
              onClick={() => navigate("/courses")}
            >
              Courses
            </div>
          </div>
        </div>
        {/* graph  */}
        <div></div>
      </div>
    </div>
  );
}
