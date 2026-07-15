import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

export default function ReviewCard({
  comment,
  rating,
  photoUrl,
  name,
  description,
  courseTitle,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md  hover:shadow-lg transition-all duration-300 max-w-sm  w-full">
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5)
          .fill(0)
          .map((_,index) => (
            <span key={1}>{index < rating ? <FaStar /> : <CiStar />}</span>
          ))}
      </div>
      <p className="text-gray-700 text-sm mb-1">{comment}</p>
      <p className="text-gray-500 text-sm mb-5">Review for: <span className="text-gray-600 font-semibold">{courseTitle}</span></p>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {photoUrl ? (
            <img
              src={photoUrl}
              className="w-11 h-11 rounded-full border-2 border-black object-cover "
              alt=""
            />
          ) : (
            <div className="w-11 h-11 flex items-center justify-center text-4xl rounded-full border-2 font-semibold border-black">
              {name.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 text-sm">{name}</h2>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
