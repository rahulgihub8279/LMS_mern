import { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import thumb_pic from "../../assets/thumb.png";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice.js";

export default function EditCourse() {
  const navigate = useNavigate();
  const thumb = useRef();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(thumb_pic);
  const [backendImage, setBackendImage] = useState("");
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleEditCourse = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("isPublished", isPublished);
      formData.append("subTitle", subTitle);
      formData.append("description", description);
      formData.append("level", level);
      formData.append("thumbnail", backendImage);

      const response = await axios.post(
        `${serverUrl}/api/course/edit/${courseId}`,
        formData,
        {
          withCredentials: true,
        },
      );
      const updateData = response.data;
      if (updateData.isPublished) {
        const updateCourses = courseData.map((c) =>
          c._id === courseId ? updateData : c,
        );
        if (!courseData.some((c) => c._id === courseId)) {
          updateCourses.push(updateData);
        }
        dispatch(setCourseData(updateCourses));
      } else {
        const filterCourse = courseData.filter((c) => c._id !== courseId);
        dispatch(setCourseData(filterCourse));
      }
      toast.success("saved successfully");
      navigate("/courses");
    } catch (err) {
      toast.error(err.message.response);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCourse = async () => {
    try {
      const flag = confirm("confirm remove course ?");
      if (!flag) return;
      setLoading1(true);
      await axios.delete(`${serverUrl}/api/course/remove/${courseId}`, {
        withCredentials: true,
      });
      const filterCourse = courseData.filter((c) => c._id !== courseId);
      dispatch(setCourseData(filterCourse));
      toast.success("course removed");
      navigate("/courses");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/course/get-course/${courseId}`,
          {
            withCredentials: true,
          },
        );
        setSelectedCourse(response.data); 
        
      } catch (err) {
        console.log(err.message);
      }
    };
    getCourseById();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || "");
      setSubTitle(selectedCourse.subTitle || "");
      setDescription(selectedCourse.description || "");
      setCategory(selectedCourse.category);
      setLevel(selectedCourse.level);
      setPrice(selectedCourse.price);
      setFrontendImage(selectedCourse.thumbnail || thumb_pic);
      setIsPublished(selectedCourse.isPublished);
    }
  }, [selectedCourse]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9ecef]">
      <div className="max-w-5xl mx-auto p-6 my-6 bg-white rounded-lg shadow-md">
        {/* top bar */}
        <div className="flex flex-row justify-between gap-5 mb-6 relative">
          <IoArrowBackSharp
            className="w-7 h-7 cursor-pointer"
            onClick={() => navigate("/courses")}
          />
          <h2 className="text-xl font-semibold md:pr-15">
            Add detail information about Course
          </h2>

          <div
            className="flex items-center justify-center px-6 py-3 rounded active:scale-98 transition bg-[#10002b] text-white text-sm cursor-pointer"
            onClick={() => navigate(`/create-lecture/${courseId}`)}
          >
            Go to lectures page
          </div>
        </div>
        {/* form section section  */}
        <div className="px-6 py-2">
          <h2 className="font-medium text-md mb-3">Basic course information</h2>
          <div className="flex flex-row gap-4">
            {!isPublished ? (
              <button
                className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-green-200 text-green-700 border-2 border-green-500 text-sm cursor-pointer hover:bg-green-300 duration-200"
                onClick={() => setIsPublished(!isPublished)}
              >
                Click to publish
              </button>
            ) : (
              <button
                className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-green-200 text-green-700 border-2 border-green-500 text-sm cursor-pointer hover:bg-green-300 duration-200"
                onClick={() => setIsPublished(!isPublished)}
              >
                Click to unPublish
              </button>
            )}
            <button
              className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-red-600 text-white text-sm cursor-pointer hover:bg-red-800 duration-200"
              onClick={handleRemoveCourse}
            >
              {loading1 ? (
                <div className="flex items-center gap-2">
                  <ClipLoader size={15} color="white"></ClipLoader> removing...
                </div>
              ) : (
                "Remove course"
              )}
            </button>
          </div>
        </div>
        {/* form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 mx-6 my-3"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="text-zinc-600 font-medium text-sm"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="course title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="text-sm border-2 border-zinc-400 p-2 rounded outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="subtitle"
              className="text-zinc-600 font-medium text-sm"
            >
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              placeholder="course subtitle"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
              className="text-sm border-2 border-zinc-400 p-2 rounded outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <label
              className="text-[15px] text-zinc-700 flex items-center gap-1 font-medium text-sm"
              htmlFor="desc"
            >
              Description
            </label>
            <textarea
              name="desc"
              type="text"
              placeholder="course description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full p-2 text-sm border-2 border-zinc-400 rounded-md outline-none resize-none"
            />
          </div>
          <div className="flex gap-10">
            {/* category */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="category"
                className="text-zinc-600 font-medium text-sm"
              >
                Category
              </label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="text-sm border-2 p-2 text-zinc-500 border-zinc-400 rounded outline-none"
              >
                <option value="">Select category</option>
                <option value="Web development">Web development</option>
                <option value="UI/UX Designing">UI/UX Designing</option>
                <option value="App development">App development</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Science">Data Science</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Devops">Devops</option>
                <option value="Others">Others</option>
              </select>
            </div>
            {/* level */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="level"
                className="text-zinc-600 font-medium text-sm"
              >
                Level
              </label>
              <select
                id="level"
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                className="text-sm border-2 p-2 text-zinc-500 border-zinc-400 rounded outline-none"
              >
                <option value="">Course level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="App development">Advanced</option>
              </select>
            </div>
            {/* price  */}
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="price"
                className="text-zinc-600 font-medium text-sm"
              >
                Price (INR)
              </label>
              <input
                type="number"
                id="price"
                placeholder="₹"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="text-sm border-2 border-zinc-400 py-2 px-2 rounded outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-zinc-600 text-sm font-medium mt-4"
            >
              Course thumbnail
            </label>
            <input
              type="file"
              hidden
              ref={thumb}
              accept="image/*"
              onChange={handleThumbnail}
            />

            <div className="relative w-75 h-42">
              <img
                src={frontendImage}
                alt=""
                onClick={() => thumb.current.click()}
                className="w-full h-full rounded-sm cursor-pointer"
              />
              <FiEdit
                className="absolute top-4 right-5 w-6 cursor-pointer hover:scale-109 transition duration-200"
                size={18}
                onClick={() => thumb.current.click()}
              />
            </div>
          </div>
          <div className="flex flex-row gap-6 pl-2 mt-6">
            <button
              className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-zinc-200 text-zinc-600 border-2 border-zinc-500 text-sm cursor-pointer duration-200"
              onClick={() => navigate("/courses")}
            >
              Cancel
            </button>
            <button
              className="flex items-center justify-center px-6 py-2 rounded active:scale-98 transition   text-white text-sm cursor-pointer bg-black duration-200"
              onClick={handleEditCourse}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <ClipLoader size={15} color="white"></ClipLoader> saving...
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
