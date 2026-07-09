import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSelectedCourse } from "../redux/courseSlice";
import empty from "../assets/thumb.png";
import { FaStar } from "react-icons/fa";

export default function ViewCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        courseData.map((course) => {
          if (course._id === courseId) {
            dispatch(setSelectedCourse(course));
            console.log(selectedCourse);
            return null;
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCourseData();
  }, [courseData]);

  return (
    <div className="min-h-screen p-6 bg-[#edf6f9]">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail  */}
          <div className="w-full md:w-3/5 ">
            <IoArrowBackSharp
              size={16}
              className="w-8 h-8 mr-2 mb-3 cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => navigate("/")}
            />
            {selectedCourse?.thumbnail ? (
              <img
                src={selectedCourse?.thumbnail}
                className="w-full object-center max-h-100 rounded-xl"
              ></img>
            ) : (
              <img
                src={empty}
                className="w-full object-cover rounded-2xl"
              ></img>
            )}
          </div>
          {/* course details */}
          <div className="flex-1 space-y-2 mt-10">
            <h2 className="font-bold text-black text-3xl">
              {selectedCourse?.title}
            </h2>
            <p className="font-medium text-zinc-600">
              {selectedCourse?.subTitle}
            </p>
            <div className="flex items-start justify-between flex-col ">
              <div className="text-yellow-500 font-medium gap-2 flex items-center mt-1 mb-2">
                <span className="flex items-center gap-1 text-sm">
                  <FaStar /> 0
                </span>
                <span className="text-zinc-600 text-sm">(1,200 reviews)</span>
              </div>

              {selectedCourse?.price === 0 ? (
                <span className="font-semibold bg-green-300 px-3 mt-1 rounded-xl">
                  free
                </span>
              ) : (
                <span className="font-semibold">₹ {selectedCourse?.price}</span>
              )}
            </div>
            <button className="flex items-center justify-center px-6 py-3 rounded active:scale-98 transition bg-[#10002b] text-white text-sm cursor-pointer w-40 shadow mt-5">
              Enroll Now
            </button>
          </div>
        </div>
        {/* bottom section  */}
        <div>
          <h2 className="font-semibold text-black text-xl mb-2">
            What You'll Learn
          </h2>
          <ul className="pl-6 text-gray-500 list-disc space-y-1">
            <li>Learn {selectedCourse?.category} from beginning</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-black text-xl mb-2">
            Requirements
          </h2>
          <ul className="pl-6 text-gray-500 list-none space-y-1">
            <li>Basic programming knowledge is helpful but not required.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-black text-xl mb-2">
            Who This Course is For
          </h2>
          <ul className="pl-6 text-gray-500 list-none space-y-1">
            <li>Beginners, aspiring developers, and professionals looking to upgrade skills.</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}
