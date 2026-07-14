import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-5">
      <IoArrowBackSharp
        className="w-7 h-7 fixed top-7 left-8 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="md:text-4xl text-xl text-center font-bold mt-2 mb-6 text-zinc-800">
        Enrolled Courses
      </h1>
      {userData?.enrolledCourses.length === 0 ? (
        <p className="text-center font-semibold mt-10 text-zinc-500 text-xl">
          You have no enrolled courses
        </p>
      ) : (
        <div className="flex items-start justify-center flex-wrap gap-7 bg-white rounded-xl   shadow md:p-8 p-2 min-h-screen">
          {userData?.enrolledCourses?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300 hover:shadow-md hover:shadow-purple-800 transition-all duration-200"
            >
              <img
                src={course?.thumbnail}
                className="min-w-80 h-40 object-cover"
                alt=""
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="md:text-lg text-sm font-semibold text-gray-800">
                      {course?.title}
                    </h2>
                    <p className="text-sm text-gray-500">{course?.category}</p>
                  </div>

                  <p className="text-xs w-fit px-3 py-1 rounded mt-2 bg-gray-300 text-black">
                    {course?.level}
                  </p>
                </div>

                <button className="text-sm mt-2 bg-black text-white w-full py-2 rounded cursor-pointer hover:bg-white hover:text-black border border-gray-200 shadow trasition duration-300"
                 onClick={()=>navigate(`/view-lecture/${course?._id}`)} 
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
