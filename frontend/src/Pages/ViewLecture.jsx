import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5"; 
import { FaCirclePlay } from "react-icons/fa6";

export default function ViewLecture() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.find((c) => c._id === courseId);
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures[0] || null,
  );
  const navigate = useNavigate();

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
  }, [courseData, courseId, selectedCourse]);

  return (
    <div className="min-h-screen w-full bg-[#edf6f9] md:p-3 p-3  flex flex-col md:flex-row gap-3 items-start">
      {/* vedio section */}
      <div className="md:w-[70%] px-4 py-1 w-full min-h-[70vh] bg-white rounded-xl border border-gray-200 shadow flex flex-col">
        <div className=" mt-3 flex items-center gap-5">
          <IoArrowBackSharp
            className="w-6 h-6 cursor-pointer"
            onClick={() => navigate(`/view-course/${courseId}`)}
          />
          <h2 className="text-lg md:text-2xl font-bold">
            {selectedCourse?.title}
          </h2>
        </div>
        <div className="flex items-center gap-5 mt-2 ml-2 text-xs md:text-sm text-zinc-800">
          <p className="">Category : {selectedCourse?.category}</p>
          <p className="">Level : {selectedCourse?.level}</p>
        </div>
        <div className="aspect-video shadow w-full mb-3 rounded-lg overflow-hidden mt-5 bg-black flex items-center justify-center">
          {!selectedLecture ? (
            <div className="flex items-center justify-center">
              <span className="text-white text-sm">
                select your lecture to watch
              </span>
            </div>
          ) : selectedLecture?.vedioUrl ? (
            <video
              className="w-full h-full object-cover border border-gray-300 shadow"
              src={selectedLecture?.vedioUrl}
              controls
            ></video>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-white text-sm">
                No video available for this lecture
              </span>
            </div>
          )}
        </div>
        <h2 className="my-2 ml-1 font-semibold text-sm md:text-md text-zinc-600">{`${selectedLecture?.lectureTitle}`}</h2>
        {selectedCourse?.price === 0 ? (
          <p className="bg-green-200 w-fit mb-3 text-green-600 border border-green-400 shadow rounded px-6 ml-1 text-lg font-semiboldq">
            free
          </p>
        ) : (
          <p className="mb-2 ml-1 text-lg font-semibold">
            ₹ {selectedCourse?.price}
          </p>
        )}
      </div>
      {/* lecture info */}
      <div className="md:w-[40%] w-full h-fit bg-white rounded-xl border border-gray-200 shadow md:p-4 p-2">
        <h2 className="my-2 mb-3 ml-1 font-semibold text-sm md:text-md text-zinc-800">
          All Lectures
        </h2>
        <div className="flex flex-col gap-1">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse?.lectures?.map((lecture, index) => (
              <button
                key={index}
                className={`flex items-center justify-between gap-2 px-2 py-2 rounded active:scale-98 transition duration-200 bg-zinc-100 text-black border border-gray-200 ${selectedLecture?._id===lecture._id ? "bg-zinc-200 border-zinc-500" : "bg-zinc-100"} text-sm font-medium w-full shadow mt-2`}
                onClick={() => setSelectedLecture(lecture)}
              >
                {lecture?.lectureTitle}
                <FaCirclePlay size={18} className="cursor-pointer" />
              </button>
            ))
          ) : (
            <p className="text-zinc-500 text-center"> No lectures available.</p>
          )}
          <div className="border-t my-4 flex flex-col gap-2">
            <p className="mt-3 ml-1 text-sm font-semibold text-zinc-800">
              Instructor
            </p>
            <div className="mt-2 flex gap-3 items-center">
              {creatorData?.photoUrl ? (
                <img
                  src={creatorData?.photoUrl}
                  className="w-15 h-15 rounded-full border-2 border-black object-cover "
                  alt=""
                />
              ) : (
                <div className="w-15 h-15 flex items-center justify-center text-4xl rounded-full border-2 font-semibold border-black">
                    {creatorData?.name.slice(0,1).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{creatorData?.name}</p>
                <p className="text-sm text-zinc-700">
                  {creatorData?.description}
                </p>
                <p className="text-xs text-zinc-800">
                  {creatorData?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
