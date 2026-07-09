import axios from "axios";
import { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { serverUrl } from "../../App.jsx";
import { setLectureData } from "../../redux/lectureSlice.js";

export default function EditLecture() {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();
  const { lectureData } = useSelector((state) => state.lecture);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId,
  );
  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture.lectureTitle,
  );
  const [free, setFree] = useState(selectedLecture.isPreviewFree);
  const [vedioUrl, setVedioUrl] = useState("");
  const [loadingr, setLoadingr] = useState(false);
  const [loadingu, setLoadingu] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("lectureTitle", lectureTitle);
  formData.append("vedioUrl", vedioUrl);
  formData.append("isPreviewFree", free);

  const handleUpdate = async () => {
    try {
      setLoadingu(true);

      const response = await axios.post(
        `${serverUrl}/api/lecture/edit-lecture/${lectureId}`,
        formData,
        { withCredentials: true },
      );
      dispatch(setLectureData([...lectureData, response.data]));
      toast.success("lecture updated");
      navigate(`/create-lecture/${courseId}`);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoadingu(false);
    }
  };

  const handleRemove = async () => {
    try {
      setLoadingr(true);
      const response = await axios.delete(
        `${serverUrl}/api/lecture/delete-lecture/${lectureId}`,
        { withCredentials: true },
      ); 
      toast.success(response.data.message);
      navigate(`/create-lecture/${courseId}`);
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoadingr(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#edf6f9] min-h-screen p-3 md:p-15">
      <div className="w-full transition-all duration-300  max-w-xl bg-white rounded-xl shadow-lg px-8 py-6 space-y-4">
        {/* header  */}
        <div className="flex  gap-5 mb-6 relative">
          <IoArrowBackSharp
            className="w-7 h-7 cursor-pointer"
            onClick={() => navigate(`/create-lecture/${courseId}`)}
          />
          <h2 className="text-xl font-semibold ">Update your lecture</h2>
        </div>
        <div
          className="flex items-center justify-center w-[160px] px-6 py-2 rounded active:scale-98 transition bg-red-600 text-white text-sm cursor-pointer ml-8"
          onClick={handleRemove}
        >
          {loadingr ? (
            <div className="flex items-center gap-2">
              <ClipLoader size={15} color="white"></ClipLoader> Removing...
            </div>
          ) : (
            "Remove Lecture"
          )}
        </div>
        <div className="flex flex-col mt-7">
          <label
            htmlFor="title"
            className="text-zinc-600 font-medium text-sm mb-2"
          >
            LectureTitle *
          </label>
          <input
            type="text"
            id="lectureTitle"
            value={lectureTitle}
            required
            onChange={(e) => setLectureTitle(e.target.value)}
            className="text-sm border-2 border-zinc-300 p-2 rounded outline-none"
          />
        </div>
        <div className="flex flex-col mt-7">
          <label
            htmlFor="title"
            className="text-zinc-600 font-medium text-sm mb-2"
          >
            Vedio *
          </label>
          <input
            type="file"
            id="vedio"
            placeholder=""
            className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:bg-zinc-700 file:text-white hover:file:bg-zinc-500"
            required
            accept="vedio/*"
            onChange={(e) => setVedioUrl(e.target.files[0])}
          />
        </div>
        <div className="flex items-center gap-2 mt-7">
          <label
            htmlFor="isFree"
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 text-sm font-medium transition duration-300"
          >
            <input
              type="checkbox"
              id="isFree"
              className="rounded-md w-4 ml-1 accent-black"
              onChange={(e) => setFree(e.target.checked)}
              checked={free}
            />{" "}
            is this vedio FREE ?
          </label>
        </div>
        <button
          className="flex items-center justify-center w-full px-6 py-2 rounded active:scale-98 transition bg-[#10002b] text-white text-sm cursor-pointer shadow"
          onClick={handleUpdate}
        >
          {loadingu ? (
            <div className="flex items-center gap-2">
              <ClipLoader size={15} color="white"></ClipLoader> updating...
            </div>
          ) : (
            "Update Lecture"
          )}
        </button>
      </div>
    </div>
  );
}
