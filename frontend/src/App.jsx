import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
export const serverUrl = "http://localhost:8000";

const Home = lazy(() => import("./Pages/Home.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Signup = lazy(() => import("./Pages/Signup.jsx"));
const Badrequest = lazy(() => import("./badrequest/Badrequest.jsx"));
const Profile = lazy(() => import("./Pages/Profile.jsx"));
const EditProfile = lazy(() => import("./Pages/EditProfile.jsx"));
const Dashboard = lazy(() => import("./Pages/Educator/Dashboard.jsx"));
const Courses = lazy(() => import("./Pages/Educator/Courses.jsx"));
const CreateCourse = lazy(() => import("./Pages/Educator/CreateCourse.jsx"));
const EditCourse = lazy(() => import("./Pages/Educator/EditCourse.jsx"));
const AllCourses = lazy(() => import("./Pages/AllCourses.jsx"));
const CreateLecture = lazy(() => import("./Pages/Educator/CreateLecture.jsx"));
const EditLecture = lazy(() => import("./Pages/Educator/EditLecture.jsx"));
const ViewCourse = lazy(() => import("./Pages/ViewCourse.jsx"));
const ViewLecture = lazy(() => import("./Pages/ViewLecture.jsx"));
const MyCourses = lazy(() => import("./Pages/MyCourses.jsx"));
const SearchWithAi = lazy(() => import("./Pages/SearchWithAi.jsx"));
const Loader = lazy(() => import("./Pages/Loader.jsx"));

import ScrollToTop from "./customHooks/scrollToTop.jsx";
import getCurrentUser from "./customHooks/getCurrentUser.js";
import useGetCreatorCourse from "./customHooks/getCreatorCourse.js";
import useGetPublishedCourses from "./customHooks/getPublishedCourses.js";
import useGetAllReviews from "./customHooks/getAllReviews.js";

function App() {
  getCurrentUser();
  useGetCreatorCourse();
  useGetPublishedCourses();
  useGetAllReviews();

  const { userData } = useSelector((state) => state.user);

  return (
    <>
      <Suspense fallback={<Loader></Loader>}>
        <ScrollToTop>
          <Routes>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/profile"
              element={
                userData ? (
                  <Profile></Profile>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/editProfile"
              element={
                userData ? (
                  <EditProfile></EditProfile>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                userData?.role === "educator" ? (
                  <Dashboard></Dashboard>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/courses"
              element={
                userData?.role === "educator" ? (
                  <Courses></Courses>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/createCourse"
              element={
                userData?.role === "educator" ? (
                  <CreateCourse></CreateCourse>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/editCourse/:courseId"
              element={
                userData?.role === "educator" ? (
                  <EditCourse></EditCourse>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/allCourses"
              element={<AllCourses></AllCourses>}
            ></Route>
            <Route
              path="/create-lecture/:courseId"
              element={
                userData?.role === "educator" ? (
                  <CreateLecture></CreateLecture>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/edit-lecture/:courseId/:lectureId"
              element={
                userData?.role === "educator" ? (
                  <EditLecture></EditLecture>
                ) : (
                  <Navigate to={"/login"}></Navigate>
                )
              }
            ></Route>
            <Route
              path="/view-course/:courseId"
              element={<ViewCourse></ViewCourse>}
            ></Route>
            <Route
              path="/view-lecture/:courseId"
              element={userData ? <ViewLecture></ViewLecture> : <Login></Login>}
            ></Route>
            <Route
              path="/my-courses"
              element={userData ? <MyCourses></MyCourses> : <Login></Login>}
            ></Route>
            <Route
              path="/search-ai"
              element={<SearchWithAi></SearchWithAi>}
            ></Route>
            {""}
            <Route path="/*" element={<Badrequest></Badrequest>}></Route>
          </Routes>
        </ScrollToTop>
      </Suspense>
    </>
  );
}

export default App;
