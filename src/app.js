import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./utils/Db.js";
import { userroute } from "./routes/User.route.js";
import cookieParser from "cookie-parser";
import { reportRoute } from "./routes/Report.route.js";

dotenv.config();


const app = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json())
app.use(cookieParser())


connectDB()
  .then(() => {
    console.log("db connected successfully")
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  })
  .catch(() => {
    console.log("issue in db connection")
  })

app.use("/api/auth", userroute)
app.use("/api/report", reportRoute)

export default app;