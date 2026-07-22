import { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SearchWithAi() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const speechRecognition = window.speechRecognition();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-black to-purple-950 text-black flex flex-col items-center px-4 py-1">
      {/* search component  */}
      <div className="bg-white shadow-xl rounded-4xl p-6 sm:p-8 w-full max-w-2xl text-center relative mt-5 md:mt-15">
        <IoArrowBackSharp
          className="absolute left-[5%] top-[20%] w-4 h-4 md:w-7 md:h-7 cursor-pointer"
          color="black"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center flex-col justify-center gap-3">
          <h1 className="font-bold text-lg text-gray-700 md:text-2xl flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              color="#ff1772"
              fill="none"
              stroke="#ff1772"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="md:h-8 md:w-8 h-5 w-5"
            >
              <path d="M16.0001 16.5L20 20.5"></path>
              <path d="M18 11.5C18 15.366 14.866 18.5 11 18.5C7.13401 18.5 4 15.366 4 11.5C4 7.63404 7.13401 4.50003 11 4.50003"></path>
              <path d="M15.5 3.50003L15.7579 4.19706C16.0961 5.11105 16.2652 5.56805 16.5986 5.90142C16.932 6.2348 17.389 6.4039 18.303 6.74211L19 7.00003L18.303 7.25795C17.389 7.59616 16.932 7.76527 16.5986 8.09864C16.2652 8.43201 16.0961 8.88901 15.7579 9.803L15.5 10.5L15.2421 9.803C14.9039 8.88901 14.7348 8.43201 14.4014 8.09864C14.068 7.76527 13.611 7.59616 12.697 7.25795L12 7.00003L12.697 6.74211C13.611 6.4039 14.068 6.2348 14.4014 5.90142C14.7348 5.56805 14.9039 5.11105 15.2421 4.19706L15.5 3.50003Z"></path>
            </svg>
            Search with <span className="text-pink-500">AI</span>
          </h1>
          <div className="flex items-center bg-mist-900 rounded-full shadow-lg relative w-full mt-5">
            <input
              type="text"
              className="px-6 py-3 bg-transparent w-full text-white focus:outline-none md:text-sm text-[9px]"
              placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
            />
            <button className="absolute hover:bg-white rounded-full right-14 p-1 cursor-pointer bg-transparent transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
                color="blue"
                fill="none"
                stroke="#ff1772"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="md:h-6 md:w-6 h-5 w-5"
              >
                <path d="M16.0001 16.5L20 20.5"></path>
                <path d="M18 11.5C18 15.366 14.866 18.5 11 18.5C7.13401 18.5 4 15.366 4 11.5C4 7.63404 7.13401 4.50003 11 4.50003"></path>
                <path d="M15.5 3.50003L15.7579 4.19706C16.0961 5.11105 16.2652 5.56805 16.5986 5.90142C16.932 6.2348 17.389 6.4039 18.303 6.74211L19 7.00003L18.303 7.25795C17.389 7.59616 16.932 7.76527 16.5986 8.09864C16.2652 8.43201 16.0961 8.88901 15.7579 9.803L15.5 10.5L15.2421 9.803C14.9039 8.88901 14.7348 8.43201 14.4014 8.09864C14.068 7.76527 13.611 7.59616 12.697 7.25795L12 7.00003L12.697 6.74211C13.611 6.4039 14.068 6.2348 14.4014 5.90142C14.7348 5.56805 14.9039 5.11105 15.2421 4.19706L15.5 3.50003Z"></path>
              </svg>
            </button>
            <button className="absolute hover:bg-white rounded-full right-4 cursor-pointer p-1 bg-transparent transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="25"
                height="25"
                color="#c85ae4"
                fill="none"
                stroke="#c85ae4"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="md:h-6 md:w-6 h-5 w-5"
              >
                <path d="M17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2"></path>
                <path d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22"></path>
                <path d="M14.3327 4.64612C15.5394 4.49594 16.4959 3.53944 16.6461 2.33267C16.6689 2.14999 16.8159 2 17 2C17.1841 2 17.3311 2.14999 17.3539 2.33267C17.5041 3.53944 18.4606 4.49594 19.6673 4.64612C19.85 4.66885 20 4.81591 20 5C20 5.1841 19.85 5.33115 19.6673 5.35388C18.4606 5.50406 17.5041 6.46056 17.3539 7.66733C17.3311 7.85001 17.1841 8 17 8C16.8159 8 16.6689 7.85001 16.6461 7.66733C16.4959 6.46056 15.5394 5.50406 14.3327 5.35388C14.15 5.33115 14 5.1841 14 5C14 4.81591 14.15 4.66885 14.3327 4.64612Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
