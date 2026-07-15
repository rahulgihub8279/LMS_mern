import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "./ReviewCard.jsx";

export default function ReviewPage() {
  const { reviewData } = useSelector((state) => state.review);
  const [latestReview, setLatestReview] = useState(null);
  useEffect(() => {
    setLatestReview(reviewData?.slice(0, 6));
  }, [reviewData]);
  console.log(latestReview)
  return (
    <div className="flex items-center justify-center flex-col w-[95%] rounded-xl shadow-lg shadow-gray-700 mb-5 bg-[linear-gradient(to_right,#3b0d63_0%,#100014_20%,#000000_50%,#1a0d4d_80%,#34217a_100%)]">
      <h1 className="font-semibold text-center mt-6 text-2xl md:text-4xl mb-6 text-white">
        Read what our students says about us
      </h1>
      <span className="text-gray-300 md:w-[80%] text-sm md:text-lg text-center mb-6 px-15 md:px-4">
        Discover how our Courses is transforming learning Logos.jsx experiences
        through real feedback from students and Nav.jsx professionals worldwide.
      </span>

      <div className="w-full min-h-screen flex items-center justify-center flex-wrap gap-12 p-2 md:p-7 lg:p-12 mb-10">
        {latestReview?.map((review, index) => (
          <ReviewCard
            key={index}
            comment={review?.comment}
            rating={review?.rating}
            photoUrl={review?.user?.photoUrl}
            name={review?.user?.name}
            description={review?.user?.description}
            courseTitle={review?.course?.title}
          ></ReviewCard>
        ))}
      </div>
    </div>
  );
}
