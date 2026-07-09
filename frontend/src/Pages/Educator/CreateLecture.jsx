import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice.js";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";

export default function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${serverUrl}/api/lecture/create-lecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true },
      );
      dispatch(setLectureData([...lectureData, response.data.lecture]));
      toast.success("lecture added");
      setLectureTitle("");
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/lecture/get-course-lecture/${courseId}`,
          { withCredentials: true },
        );
        dispatch(setLectureData(response.data.course.lectures));
      } catch (err) {
        console.log(err.message);
      }
    };
    getCourseLecture();
  }, []);

  return (
    <div className="flex items-center justify-center bg-[#edf6f9] min-h-screen p-3 md:p-15">
      <div className="bg-white shadow-xl rounded-xl w-full">
        {/* {header} */}
        <div className="mb-6 p-5">
          <h1 className="text-3xl font-semibold text-zinc-800 mb-2">
            Add Course Lectures
          </h1>
          <p className="text-sm mb-2 text-zinc-600">
            {" "}
            Enter the title and add your video lectures to enhance your course
            content.
          </p>
          {/* input area  */}
          <input
            type="text"
            id="lecturetitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="e.g. Interoduction to Mern Stack"
            className="text-sm border text-zinc-800 w-full mt-4  border-zinc-400 p-4 rounded-md outline-none focus:ring-black focus:ring-1 transition-all duration-200"
          />
          <div className="flex gap-4 mb-6 mt-3 transition-all duration-200">
            <button
              className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-zinc-300 text-zinc-900  text-sm cursor-pointer duration-200 hover:bg-zinc-400 shadow"
              onClick={() => navigate(`/editCourse/${courseId}`)}
            >
              <IoArrowBackSharp className="w-4 h-4 mr-2 cursor-pointer" />
              Back to Course
            </button>

            <button
              className="flex items-center justify-center px-6 py-2 rounded active:scale-98 transition bg-[#10002b] text-white text-sm cursor-pointer w-[160px] shadow"
              onClick={handleCreateLecture}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <ClipLoader size={15} color="white"></ClipLoader> creating...
                </div>
              ) : (
                "+ Create Lecture"
              )}
            </button>
          </div>
          {/* lecture list  */}
          {lectureData.length === 0 && <div className="font-medium ml-2">no lectures </div>}
          <div className="space-y-2">
            {lectureData?.map((lecture, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded flex justify-between items-center p-3 text-sm font-medium text-gray-700"
              >
                <span>{`Lecture - ${index + 1}: ${lecture.lectureTitle}`}</span>
                <FiEdit
                  className="w-6 cursor-pointer hover:scale-109 transition duration-200"
                  size={17}
                  onClick={() =>
                    navigate(`/edit-lecture/${courseId}/${lecture._id}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
