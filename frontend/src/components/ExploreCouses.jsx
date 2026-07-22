import { FaLocationArrow } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { SiOpenaigym } from "react-icons/si";
import { Si365Datascience } from "react-icons/si";
import { TbCloudComputing } from "react-icons/tb";
import { VscAzureDevops } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export default function ExploreCouses() {
  const navigate = useNavigate();
  return (
    <div className="flex w-[96%] min-h-[50vh] flex-col md:flex-row items-center justify-center gap-5 px-5 md:px-[30px] py-2 bg-white my-0 rounded-xl">
      <div className="w-full md:w-[350px] px-0 py-2 md:px-6 flex flex-col items-center md:items-start justify-center gap-5 md:gap-10">
        <div className="flex gap-2 md:gap-0 md:flex-col items-c">
          <span className="font-semibold text-2xl md:text-4xl">Explore</span>
          <span className="font-semibold text-2xl md:text-4xl">
            Our Courses
          </span>
        </div>
        <p className="text-sm md:text-[17px] font-light sm:text-center md:text-start tracking-tight">
          CourseBuddY LMS is an all-in-one platform for managing, teaching, and
          learning.This landing page was designed as a promotional tool to
          inform users about the features and benefits of EduSphere and to
          encourage them to explore the platform.
        </p>

        <button
          className="flex items-center gap-3 px-6 py-3 rounded bg-[#10002b] text-white text-sm md:text-md cursor-pointer active:scale-95 outline-none"
          onClick={() => navigate("/allCourses")}
        >
          Explore Courses <FaLocationArrow />
        </button>
      </div>
      <div className="w-[720px] max-w-[90%] md:min-h-[300px] flex items-center justify-center gap-12 md:gap-14 flex-wrap mb-12 md:mb-0">
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg ">
          <div className="w-[100px] min-h-[90px] bg-blue-200 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500">
            <TbDeviceDesktopAnalytics size={50} className="" />
          </div>
          <span className="font-light text-center text-blue-500">
            Web development
          </span>
        </div>
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg">
          <div className="w-[100px] min-h-[90px] bg-purple-200 shadow-purple-500 shadow-lg rounded-lg flex items-center justify-center">
            <FaUikit size={50} />
          </div>
          <span className="font-light text-center text-purple-500">
            UI/UX Designing
          </span>
        </div>
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg">
          <div className="w-[100px] min-h-[90px] bg-green-200 shadow-green-500 shadow-lg rounded-lg flex items-center justify-center">
            <MdOutlineAppSettingsAlt size={50} />
          </div>
          <span className="font-light text-center text-green-500">
            App development
          </span>
        </div>
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg">
          <div className="w-[100px] h-[90px] bg-pink-200 shadow-pink-500 shadow-lg rounded-lg flex items-center justify-center">
            <FaHackerrank size={50} />
          </div>
          <span className="font-light text-center text-pink-500">
            Ethical Hacking
          </span>
        </div>
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg">
          <div className="w-[100px] min-h-[90px] bg-red-200 shadow-red-500 shadow-lg rounded-lg flex items-center justify-center">
            <SiOpenaigym size={50} />
          </div>
          <span className="font-light text-center text-red-500">AI/ML</span>
        </div>
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg">
          <div className="w-[100px] h-[90px] bg-cyan-200 shadow-cyan-500 shadow-lg rounded-lg flex items-center justify-center">
            <Si365Datascience size={50} />
          </div>
          <span className="font-light text-center text-cyan-500">
            Data Science
          </span>
        </div>
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg">
          <div className="w-[100px] min-h-[90px] bg-fuchsia-200 shadow-fuchsia-500 shadow-lg rounded-lg flex items-center justify-center">
            <TbCloudComputing size={50} />
          </div>
          <span className="font-light text-center text-fuchsia-500">
            Cloud Computing
          </span>
        </div>
        {""}
        <div className="w-[100px] h-[130px] hover:scale-105 transition-all duration-200 font-light text-[14px] flex flex-col items-center gap-2 rounded-lg">
          <div className="w-[100px] h-[90px] bg-mist-300 shadow-mist-500 shadow-lg rounded-lg flex items-center justify-center">
            <VscAzureDevops size={50} />
          </div>
          <span className="font-light text-center text-mist-500">Devops</span>
        </div>
      </div>
    </div>
  );
}
