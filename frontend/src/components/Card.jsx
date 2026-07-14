import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Card({ thumbnail, title, category, price, id, rating }) {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer max-w-90 max-h-75 w-full bg-[#f8f9fa] rounded-2xl overflow-hidden shadow-md shadow-zinc-600 hover:shadow-lg hover:shadow-purple-600 transition-all duration-200 border-zinc-400 hover:scale-101 hover:-translate-y-2 flex flex-col"
      onClick={()=>navigate(`/view-course/${id}`)}
    >
      <img src={thumbnail} className="w-full h-40 object-cover" alt="course" />
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 ml-3 capitalize">
          {title}
        </h2>
        <span className="px-3 py-2 w-fit rounded ml-3 bg-zinc-200 text-zinc-800 capitalize">
          {category}
        </span>

        <div className="flex items-center justify-between text-sm text-zinc-600 mt-2 px-3">
          {price === 0 ? (
            <span className="text-green-800 px-4 py-1 rounded-2xl font-semibold bg-green-300">
              free
            </span>
          ) : (
            <span className="text-gray-800 font-semibold">₹{price}</span>
          )}
          <span className="flex items-center text-lg gap-1">
            <FaStar size={13} color="" />{rating}
          </span>
        </div>
      </div>
    </div>
  );
}
