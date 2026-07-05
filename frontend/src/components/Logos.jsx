import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdGroups } from "react-icons/md";

export default function Logos() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-10 min-h-20 my-10 mx-5">
      <div className="flex items-center justify-center gap-4 px-4 py-3 rounded cursor-pointer bg-zinc-300 text-blue-950">
        <MdCastForEducation className="fill-black w-8 h-7" /> 50+ online courses
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-3  rounded cursor-pointer bg-zinc-300 text-blue-950">
        <SiOpenaccess className="fill-black w-8 h-7" /> Lifetime access
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer bg-zinc-300 text-blue-950">
        <MdOutlineAttachMoney className="fill-black w-8 h-7" /> Value for money
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded cursor-pointer bg-zinc-300 text-blue-950">
        <MdGroups className="fill-black w-8 h-7" /> Community support
      </div>
    </div>
  );
}
