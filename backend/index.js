import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import lectureRouter from "./routes/lectureRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import connectDb from "./config/connectdb.js";

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/lecture", lectureRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  connectDb();
});
