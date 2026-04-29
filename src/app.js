import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectDb } from "./utils/Db.js";
import { userroute } from "./routes/User.route.js";
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json())


connectDb()
.then(()=>{
  console.log("db connected successfully")
  app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

})
.catch(()=>{
  console.log("issue in db connection")
})
 
app.use("/api/auth",userroute)


export default app;
