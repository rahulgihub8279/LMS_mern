import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  const navigate = useNavigate();

  const courseProgressData =
    creatorCourseData?.map((course) => ({
      name: course?.title.slice(0, 10) + "...",
      lectures: course?.lectures.length || 0,
    })) || [];
  const courseEnrolledData =
    creatorCourseData?.map((course) => ({
      name: course?.title.slice(0, 10) + "...",
      enrolled: course?.enrolledStudents.length || 0,
    })) || [];

  const totalEarning =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course?.enrolledStudents.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;
      return sum + courseRevenue;
    }, 0) || 0;
  return (
    <div className="flex min-h-screen">
      <IoArrowBackSharp
        className="absolute left-[5%] top-[2%] w-7 h-7 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="w-full px-6 py-10  bg-[#e9ecef] space-y-10">
        {/* info section  */}
        <div className="mt-3 max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center  gap-6">
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-24 h-24 rounded-full object-cover border-2 border-black"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex justify-center items-center border-2 border-black">
              <span className="text-5xl">
                {userData.name.slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}
          <div className="text-center flex flex-col items-center md:items-start md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-zinc-800">
              Welcome, {userData?.name} 👋
            </h1>
            <h1 className="text-xl font-semibold text-gray-500">
              Total Earning{" "}
              <span className="text-green-500"> ₹ {totalEarning}</span>
            </h1>
            <p className="text-zinc-600 text-sm">
              {userData?.description || "Start creating courses for studets"}
            </p>
            <div
              className="flex items-center justify-center px-4 py-2 rounded active:scale-98 transition bg-[#10002b] text-white mt-3 text-sm cursor-pointer w-[50%] "
              onClick={() => navigate("/courses")}
            >
              Courses
            </div>
          </div>
        </div>
        {/* educator graph */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* course progres graph  */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-semibold capitalize mb-2">
              course Progress (Lectures)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                <XAxis dataKey="name"></XAxis>
                <YAxis dataKey="lectures"></YAxis>
                <Tooltip></Tooltip>
                <Legend />
                <Bar
                  dataKey="lectures"
                  fill="black"
                  radius={[5, 5, 0, 0]}
                ></Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* enrolled students  */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-semibold capitalize mb-2">
              student enrollment
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseEnrolledData}>
                <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                <XAxis dataKey="name"></XAxis>
                <YAxis dataKey="enrolled"></YAxis>
                <Legend />
                <Tooltip></Tooltip>
                <Bar dataKey="enrolled" fill="" radius={[5, 5, 0, 0]}></Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
