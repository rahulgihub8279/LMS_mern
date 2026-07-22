import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white py-7 px-6 w-full">
      <div className="max-w-7xl mx-auto flex  items-start justify-center gap-10 lg:gap-35 flex-col lg:flex-row">
        <div className="lg:w-[40%] md:w-[50%] w-full">
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="text-white flex items-center mb-2 py-2 rounded bg-[#0a0f09f4]"
          >
            <span className="font-extrabold text-lg md:text-2xl">Course</span>
            <span className="font-extrabold text-lg md:text-2xl text-blue-600">
              Budd<span>Y</span>
            </span>
          </Link>
          <p className="text-sm">
            AI-powered learning platform to help you grow smarter. Learn
            aything, anytime, anywhere.
          </p>
        </div>
        <div className="lg:w-[30%] md:w-full">
          <div className="text-white font-semibold mb-2"> Quick Links</div>
          <ul className="text-sm space-y-1 transition-all duration-300">
            <li
              className="cursor-pointer hover:text-lime-300"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-lime-300"
              onClick={() => navigate("/allCourses")}
            >
              All Courses
            </li>
            <li
              className="cursor-pointer hover:text-lime-300"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </li>
            <li
              className="cursor-pointer hover:text-lime-300"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
          </ul>
        </div>
        <div className="lg:w-[30%] md:w-full">
          <div className="text-white font-semibold mb-2">Category</div>
          <ul className="text-sm space-y-1 transition-all duration-300">
            <li className="text-zinc-400">Web development</li>
            <li className="text-zinc-400">UI/UX Designing</li>
            <li className="text-zinc-400">App development</li>
            <li className="text-zinc-400">Ethical Hacking</li>
            <li className="text-zinc-400">AI/ML</li>
            <li className="text-zinc-400">Data Science</li>
            <li className="text-zinc-400">Cloud Computing</li>
            <li className="text-zinc-400">Devops</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} LearnAI. All rights reserved.
      </div>
    </div>
  );
}
