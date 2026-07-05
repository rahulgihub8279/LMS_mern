import { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../App.jsx";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${serverUrl}/api/course/create`,
        { title, category },
        { withCredentials: true },
      );
      toast.success("course added");
      navigate("/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9ecef] px-4 py-10 ">
      <div className="bg-white max-w-xl w-150 mx-auto p-6 rounded-lg shadow-md mt-10 relative">
        <IoArrowBackSharp
          className="absolute left-[5%] top-[8%] w-7 h-7 cursor-pointer"
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Course
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5 mt-8 px-5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-zinc-600 font-semibold ">
              Course title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter course title"
              className="text-sm border-2 border-zinc-400 p-2 rounded outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-zinc-600 font-semibold ">
              Course category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm border p-2 text-zinc-500 border-zinc-400 rounded outline-none"
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
          <button
            className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-[#10002b] text-white text-sm cursor-pointer w-full"
            disabled={loading}
            onClick={handleCreate}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <ClipLoader size={15} color="white"></ClipLoader> creating...
              </div>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
