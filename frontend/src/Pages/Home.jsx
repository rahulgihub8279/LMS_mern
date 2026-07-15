import Nav from "../components/Nav.jsx";
import "./home.css";
import Logos from "../components/Logos.jsx";
import ExploreCouses from "../components/ExploreCouses.jsx";
import About from "../components/About.jsx";
import Footer from "../components/Footer.jsx";
import CardPage from "../components/CardPage.jsx";
import { useNavigate } from "react-router-dom";
import ai from "../assets/ai.png";
import ReviewPage from "../components/ReviewPage.jsx";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden flex flex-col items-center">
      <Nav></Nav>

      {/* hero section */}
      <div className="bg-[#ffffff] flex flex-col h-auto w-full ">
        <div className="mt-25 mx-5 py-10 h-[85vh] bg-[#01031b] text-white flex flex-col gap-3 items-center justify-center rounded-2xl ">
          <span className="text-5xl md:text-6xl px-25 font-bold tracking-wide text-center">
            Where Learning, Teaching and Managing Align -{" "}
            <span className="text-[#b0ff00]">CourseBuddy</span>
          </span>
          <span className="text-sm md:text-xl mt-10 tracking-wide w-[90%] text-center">
            An all-in-one LMS built for real learning - intuitive, efficient,
            and empowering.
          </span>
          <div className="flex items-center justify-center w-[80%] gap-8 mt-10 flex-wrap">
            <button
              className="px-8 py-3 mt-7 text-lg bg-transparent text-white rounded-4xl border-3 border-blue-800 cursor-pointer font-light hover:border-blue-950 transition duration-100 active:scale-95"
              onClick={() => navigate("/allCourses")}
            >
              View all courses
            </button>

            <button className="px-7 py-3 mt-7 text-lg text-white rounded-4xl border-3 border-pink-500 cursor-pointer font-light hover:border-blue-900 transition duration-100 active:scale-95 animate-fast-pulse flex gap-2 items-center">
              search with AI{" "}
              <img src={ai} alt="" className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>
      </div>
      {/* {"logos"} */}
      <Logos></Logos>
      {/* explore courses */}
      <ExploreCouses></ExploreCouses>
      <CardPage></CardPage>
      {/* about  */}
      <About></About>
      {/* reviews  */}
      <ReviewPage></ReviewPage>
      {/* footer  */}
      <Footer></Footer>
    </div>
  );
}
