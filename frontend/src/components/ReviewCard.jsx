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
    <div className="bg-white p-2 md:p-6 rounded-xl shadow-lg hover:shadow-lg hover:shadow-mist-600 transition-all duration-300 max-w-75 md:max-w-sm hover:scale-101 w-full">
      <div className="flex items-center mb-2 md:mb-3 text-yellow-800 text-sm">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <span key={index}>{index < rating ? <FaStar /> : <CiStar />}</span>
          ))}
      </div>
      <textarea
        name="comment"
        className="w-full text-xs md:text-sm resize-none max-h-15 overflow-hidden p-2 bg-mist-100 rounded outline-none"
        readOnly
        value={comment}
      ></textarea>

      <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3">
        Review for:{" "}
        <span className="text-gray-600 font-medium md:font-semibold">
          {courseTitle}
        </span>
      </p>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {photoUrl ? (
            <img
              src={photoUrl}
              className="md:w-11 md:h-11 w-6 h-6 rounded-full border-2 border-black object-cover"
            />
          ) : (
            <div className="md:w-11 md:h-11 w-6 h-6 flex items-center justify-center text-2xl md:text-4xl rounded-full border-2 font-semibold border-black">
              {name.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 text-xs md:text-sm">{name}</h2>
          <p className="text-gray-500 text-xs md:text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
