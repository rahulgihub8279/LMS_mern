import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export default function EditProfile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name || "");
  const [desc, setDesc] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("photoUrl", photoUrl);

  const handleEdit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      dispatch(setUserData(response.data));
      console.log(response);
      toast.success("profile updated");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 min-h-screen flex items-center justify-center bg-zinc-300">
      <div className="bg-white max-w-xl w-full rounded-xl shadow relative p-8">
        <IoArrowBackSharp
          className="absolute left-[5%] top-[5%] w-7 h-7 cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-center font-bold mb-4 text-xl text-blue-900">
          Edit profile
        </h2>
        <form
          action=""
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center text-center gap-3">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-black"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex justify-center items-center border-4 border-black">
                <span className="text-5xl">
                  {userData.name.slice(0, 1).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <label
              htmlFor="avatar"
              className="text-[15px] flex items-center gap-1 font-medium text-zinc-700"
            >
              Select Avatar{" "}
              <CgProfile className="w-4 h-4 text-black" fill="black" />
            </label>
            <input
              type="file"
              id="avatar"
              name="photoUrl"
              placeholder="photo url"
              accept="image/*"
              className="w-full px-4 py-2 text-sm border rounded-md"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <label className="text-[15px] font-medium text-zinc-700 flex items-center gap-1 ">
              User name <MdDriveFileRenameOutline className="w-5 h-5" />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={userData.name}
              className="w-full px-4 py-2 text-sm border rounded-md outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <label className="text-[15px] font-medium text-zinc-700 flex items-center gap-1 ">
              Email <MdOutlineEmail className="w-5 h-5" />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              readOnly
              placeholder={userData.email}
              className="w-full px-4 py-2 text-sm border rounded-md outline-none"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <label className="text-[15px] font-medium text-zinc-700 flex items-center gap-1">
              Description <MdOutlineDescription className="w-5 h-5" />
            </label>
            <textarea
              name="desc"
              type="text"
              placeholder={userData.description}
              className="w-full px-4 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-blue-600 resize-none"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>

          <button
            className="mt-8 px-4 flex gap-1 py-2 rounded bg-black  text-white cursor-pointer transition duration-200 text-sm"
            onClick={handleEdit}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <ClipLoader size={15} color="white"></ClipLoader> saving...
              </div>
            ) : (
              "save changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
