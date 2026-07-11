import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { setCreatorCourseData } from "../../redux/courseSlice.js";

export default function Courses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatorCourseData } = useSelector((state) => state.course);
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

  return (
    <div className="flex min-h-screen bg-[#e9ecef]">
      <div className="w-full min-h-screen p-3 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <div className="flex items-center justify-center gap-3">
            <IoArrowBackSharp
              className="w-7 h-7 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
            <h2 className="text-2xl font-bold">All created Courses</h2>
          </div>
          <div
            className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-[#10002b] text-white text-sm cursor-pointer"
            onClick={() => navigate("/createCourse")}
          >
            Create Courses
          </div>
        </div>

        {/* courses table large */}
        <div className="relative hidden min-h-[80%] md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-200">
              <tr>
                <th className="py-3 px-4 left-10 absolute">Courses</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {creatorCourseData?.map((course, index) => (
                <tr
                  key={index}
                  className="border-b bg-zinc-100 hover:bg-gray-200 transition duration-200"
                >
                  <td className="py-3 pl-9 flex items-center gap-4">
                    <img
                      src={course?.thumbnail}
                      className="w-30 h-18 object-cover rounded-md"
                      alt="thumbnail"
                    />
                    <span>{course?.title}</span>
                  </td>
                  {course?.price ? (
                    <td className="px-4 py-3">₹ {course?.price}</td>
                  ) : (
                    <td className="px-4 py-3">Free</td>
                  )}
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full ${course.isPublished ? "text-green-500 bg-green-200" : "text-red-500 bg-red-200"} font-semibold  text-[12px] px-3 py-1`}
                    >
                      {course.isPublished ? "published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 ">
                    <FiEdit
                      className="w-6 cursor-pointer hover:scale-109 transition duration-200"
                      size={17}
                      onClick={() => navigate(`/editCourse/${course._id}`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="absolute bottom-0 left-[40%] text-sm text-zinc-500 mt-6">
            list of your recent courses.
          </p>
        </div>

        {/* courses table small */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 hover:bg-zinc-200 transition duration-200"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={course.thumbnail}
                  alt=""
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1 ">
                  <h2 className="font-medium text-sm">{course.title}</h2>
                  <p className="text-zinc-800 text-xs mt-1">
                    {course.price ? "₹ " + course.price : "free"}
                  </p>
                </div>
                <FiEdit
                  className="w-6 cursor-pointer hover:scale-109 transition duration-200"
                  size={17}
                  onClick={() => navigate(`/editCourse/${course._id}`)}
                />
              </div>
              <span
                className={`w-fit rounded-full ${course.isPublished ? "text-green-500 bg-green-200" : "text-red-500 bg-red-200"} font-semibold text-[12px] px-3 py-1`}
              >
                {course.isPublished ? "published" : "Draft"}
              </span>
            </div>
          ))}
          <p className="text-sm text-center text-zinc-500 mt-6 pl-4">
            list of your recent courses.
          </p>
        </div>
      </div>
    </div>
  );
}
