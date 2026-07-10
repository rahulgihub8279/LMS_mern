import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSelectedCourse } from "../redux/courseSlice.js";
import empty from "../assets/thumb.png";
import { FaStar } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import Card from "../components/Card.jsx";

export default function ViewCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourses, setCreatorCourses] = useState(null);

  useEffect(() => {
    const fetchCourseData = () => {
      try {
        const course = courseData.find((course) => course._id === courseId);
        if (course) {
          dispatch(setSelectedCourse(course));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCourseData();
  }, [courseData, courseId, dispatch]);

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        if (selectedCourse?.creator) {
          const response = await axios.post(
            `${serverUrl}/api/course/get-creator-by-Id`,
            { userId: selectedCourse?.creator },
            { withCredentials: true },
          );
          setCreatorData(response.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getCreatorData();
  }, [selectedCourse]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator === creatorData?._id && course._id !== courseId,
      );
      setCreatorCourses(creatorCourse);
    }
  }, [creatorData, courseData]);

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
        <div className="flex flex-col gap-7 ml-5">
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
              <li>
                Beginners, aspiring developers, and professionals looking to
                upgrade skills.
              </li>
            </ul>
          </div>
        </div>
        {/* lectures area  */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="font-semibold text-zinc-800 text-xl mb-2">
              Course Curriculum{" "}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length || 0} Lectures
            </p>
            <div className="flex flex-col gap-2">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  className={`flex  items-center text-left justify-start gap-2 px-4 py-2 rounded active:scale-98 transition duration-200 bg-zinc-100 text-black border border-gray-200 text-sm w-full shadow mt-5 ${lecture.isPreviewFree ? "hover:bg-zinc-300 cursor-pointer " : "cursor-not-allowed"}`}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture?.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                >
                  {lecture?.isPreviewFree ? <FaPlay /> : <FaLock />}
                  {lecture?.lectureTitle}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white w-full md:w-3/5 p-5 rounded-2xl shadow-lg border border-gray-200">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.vedioUrl ? (
                <video
                  className="w-full h-full object-cover"
                  src={selectedLecture?.vedioUrl}
                  controls
                ></video>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-white text-sm">
                    select a preview lecture to watch
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* reviews  */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Write a review</h2>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className="fill-zinc-500"></FaStar>
            ))}
          </div>
          <textarea
            name="review"
            placeholder="write something"
            className="text-sm w-full p-2 border-zinc-400 rounded outline-0 resize-none border"
          ></textarea>
          <button className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-[#10002b] text-white text-sm cursor-pointer w-40 shadow mt-2">
            Submit Review
          </button>
        </div>
        {/* creator details  */}
        <div className="flex items-start justify-center flex-col gap-4 p-4 mt-6 border-t">
          <div className="mb-3">
            <img
              src={creatorData?.photoUrl}
              className="w-20 h-20 rounded-full object-cover mt-5"
              alt=""
            />
            <h2 className="font-semibold text-xl">{creatorData?.name}</h2>
            <p className="text-sm text-zinc-700">{creatorData?.description}</p>
            <p className="text-sm text-zinc-500">{creatorData?.email}</p>
          </div>

          <div className="">
            <p className="text-xl font-semibold mb-2">
              Other published courses by the educator
            </p>
          </div>
          <div className="w-full transition-all duration-300 py-5 flex items-center justify-center md:justify-start flex-wrap gap-6 md:px-15 border rounded-xl shadow border-zinc-300 ">
            {creatorCourses?.map((course, index) => (
              <Card
                key={index}
                thumbnail={course.thumbnail}
                title={course.title}
                category={course.category}
                price={course.price}
                id={course._id}
              ></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
