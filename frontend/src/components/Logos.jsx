import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdGroups } from "react-icons/md";

export default function Logos() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-5 md:gap-10 min-h-20 my-10 mx-6 md:mx-5">
      <div className="flex items-center justify-center gap-2 md:gap-4 px-4 py-3 rounded bg-zinc-300 text-blue-950 text-sm md:text-lg">
        <MdCastForEducation className="fill-black w-8 h-7" /> 50+ online courses
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-4 px-4 py-3 rounded bg-zinc-300 text-blue-950 text-sm md:text-lg">
        <SiOpenaccess className="fill-black w-8 h-7" /> Lifetime access
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-4 px-4 py-3 rounded bg-zinc-300 text-blue-950 text-sm md:text-lg">
        <MdOutlineAttachMoney className="fill-black w-8 h-7" /> Value for money
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-4 px-4 py-3 rounded bg-zinc-300 text-blue-950 text-sm md:text-lg">
        <MdGroups className="fill-black w-8 h-7" /> Community support
      </div>
    </div>
  );
}
