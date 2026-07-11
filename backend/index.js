import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import lectureRouter from "./routes/lectureRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import connectDb from "./config/connectdb.js";
const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  connectDb();
});
