import { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux"; 

export default function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    setPopularCourses(courseData?.slice(0, 6));
  }, [courseData]);

  return (
    <div className="mx-5 mt-20 w-full relative flex gap-4 items-center justify-center flex-col">
      <div className="flex gap-5 items-center justify-center">
         
        <h1 className="font-bold bg-[#000000] shadow-lg mb-5 shadow-cyan-600 transition-all duration-300 text-white px-8 py-2 rounded text-3xl md:text-4xl">
          Popular Courses
        </h1>
      </div>
      <span className="text-center text-xl text-[#415a77] font-semibold mx-20 mb-8">
        Explore top-rated courses designed to boost your I skills, enhance
        careers, and unlock opportunities in tech, AI, business, and beyond .
      </span>
      <div className="w-[95%] rounded-2xl min-h-screen flex items-start sm:justify-center flex-wrap gap-6 md:gap-10 mb-10 bg-[#e9ecef] p-20">
        {popularCourses?.map((course, id) => (
          <Card
            key={id}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
          ></Card>
        ))}
      </div>
    </div>
  );
}
