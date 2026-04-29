import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/Db.js";
import { userroute } from "./routes/User.route.js";
import cookieParser from "cookie-parser";
import { reportRoute } from "./routes/Report.route.js";

dotenv.config();

dotenv.config();

const app = express();
// Consistent naming: use PORT (uppercase) to match the standard convention
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json())
app.use(cookieParser())

// Main routes should generally be defined outside the .then() block 
// so they are registered as soon as the app starts
app.use("/api/auth", userroute);

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
