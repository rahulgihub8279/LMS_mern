import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import { IoArrowBackSharp } from "react-icons/io5";
import ai from "../assets/ai.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import useGetAllCourses from "../customHooks/getAllCourses.js";

export default function AllCourses() {
  useGetAllCourses();

  const navigate = useNavigate();
  const { allCourses } = useSelector((state) => state.course);
  const [category, setCategory] = useState([]);
  const [filerCourses, setFilterCourses] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  const toggelCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    setFilterCourses(allCourses);
  }, [allCourses]);

  useEffect(() => {
    const applyFilter = () => {
      let courseCopy = allCourses?.slice();
      if (category.length > 0) {
        courseCopy = courseCopy.filter((c) => category.includes(c.category));
      }
      setFilterCourses(courseCopy);
    };
    applyFilter();
  }, [category]);
 
  return (
    <div className="min-h-screen flex bg-[#e9ecef]">
      <Nav></Nav>
      <button
        className={`fixed w-19 z-1 top-20 left-4 px-2 py-1 ml-5 text-sm rounded-lg ${sidebar ? "bg-white text-black" : "bg-blue-950 text-white"} cursor-pointer md:hidden font-light transition duration-200 `}
        onClick={() => setSidebar(!sidebar)}
      >
        {sidebar ? "hide <<" : "show >>"}
      </button>
      {/* sidebar  */}

      <aside
        className={`w-70 min-h-screen overflow-y-auto fixed top-0 left-0 p-6 py-30 bg-[#00171f] border-r border-gray-500 shadow-lg shadow-blue-950 transition-transform duration-300 z-0 ${sidebar ? "translate-x-0" : "-translate-x-full"} block md:translate-x-0`}
      >
        <div className="mb-5 flex text-white items-center justify-center gap-4">
          <IoArrowBackSharp
            className="w-7 h-7 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h2 className="text-xl font-semibold w-full">Filter by Category</h2>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="h-110 bg-[#415a77] overflow-y-auto border-2 border-white px-4 py-2 ml-4 rounded-2xl space-y-4 text-white text-sm"
        >
          <button className="px-4 py-3 ml-2 mt-1 text-sm text-white rounded-lg bg-[#001219]   cursor-pointer font-light transition duration-100 active:scale-95 flex gap-2 items-center">
            Search with AI <img src={ai} alt="" className="w-3 h-3" />
          </button>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"Web development"}
              onChange={toggelCategory}
            />{" "}
            Web development
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"UI/UX Designing"}
              onChange={toggelCategory}
            />{" "}
            UI/UX Designing
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"App development"}
              onChange={toggelCategory}
            />{" "}
            App development
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"Ethical Hacking"}
              onChange={toggelCategory}
            />{" "}
            Ethical Hacking
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"AI/ML"}
              onChange={toggelCategory}
            />
            AI/ML
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"Data Science"}
              onChange={toggelCategory}
            />{" "}
            Data Science
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"Cloud Computing"}
              onChange={toggelCategory}
            />{" "}
            Cloud Computing
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"Devops"}
              onChange={toggelCategory}
            />
            Devops
          </label>

          <label
            htmlFor=""
            className="flex text-center gap-3 cursor-pointer active:text-gray-900 hover:text-gray-900 font-bold  transition duration-300"
          >
            <input
              type="checkbox"
              className="rounded-md accent-black"
              value={"Others"}
              onChange={toggelCategory}
            />
            Others
          </label>
        </form>
      </aside>
      {""}
      <main className="w-full transition-all duration-300 py-[100px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[50px]">
        {filerCourses?.map((course, index) => (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
          ></Card>
        ))}
      </main>
    </div>
  );
}
