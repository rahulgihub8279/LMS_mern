import { BarLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex items-center justify-center bg-zinc-200 min-h-screen">
      <BarLoader height={7} width={200} speedMultiplier={1.5} />
    </div>
  );
}
