import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.router.js";
import jobRouter from "./routes/job.router.js";
import applicationRouter from "./routes/application.router.js";
import path from "path";

const app = express();
dotenv.config({})




//middleware:

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://job-portal-40kc.onrender.com","http://localhost:5173"],
    credentials: true,
  })
);

//api routes

app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

// ------------code for deployment-------------
if (process.env.NODE_ENV === "production"){
 const dirpath = path.resolve();
 app.use(express.static('./Frontend/dist'));
 app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(dirpath,'./Frontend/dist','index.html'));
 })
}


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    connectDB();
  console.log(`server is running on port ${PORT}`);
});
