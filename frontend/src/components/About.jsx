import tutor from "../assets/tutor.png";
import coding from "../assets/coding.mp4";
import { TbArrowBigRightLineFilled } from "react-icons/tb";
import { BsPatchCheckFill } from "react-icons/bs";

export default function About() {
  return (
    <div className="w-[95%] min-h-[50vh] flex flex-wrap items-center justify-center gap-6 mb-7 md:h-[70vh] border mx-5 p-2 border-zinc-300 rounded-2xl shadow">
      {/* image  */}
      <div className="md:w-[40%] w-full h-full  flex items-center justify-center relative">
        <img
          src={tutor}
          className="rounded-xl object-cover w-full h-full"
          alt=""
        />
        <div className="h-[45%] w-[55%] mx-auto absolute left-[50%] top-[52%] aspect-video flex items-center justify-center">
          <video
            src={coding}
            className="w-full h-full object-cover rounded-xl border-3 border-zinc-200"
            controls
            autoPlay
            loop
            muted
          ></video>
        </div>
      </div>
      {/* about info */}
      <div className="w-full h-full md:w-[50%] flex flex-col items-start justify-center px-[35px] lg:px-20 ">
        <div className="flex gap-3 items-center mb-3">
          <span className="font-medium text-2xl ">About us </span>
          <TbArrowBigRightLineFilled size={20} />
        </div>
        <h1 className="font-bold text-xl md:text-3xl lg:text-5xl mt-3">
          We Are Maximize Your Learning Growth
        </h1>
        <p className="mt-4 tracking-wide">
          We provide a modern Learning Management System to simplify online
          education, track progress, and enhance student-instructor
          collaboration efficiently.
        </p>
        <div className="flex items-center justify-between gap-6 mt-6 text-sm">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <BsPatchCheckFill />
              Simplified Learning
            </div>
            <div className="flex items-center gap-4">
              <BsPatchCheckFill />
              Big Experience
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <BsPatchCheckFill />
                Expert Trainers
              </div>
              <div className="flex items-center gap-4">
                <BsPatchCheckFill />
                Lifetime Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
