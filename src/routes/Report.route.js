import { Router } from "express";
import multer from "multer";
import { createReport, getReports } from "../controllers/Report.controller.js";
import auth_user from "../middilwares/Auth_middleware.js";
const reportRoute = Router();
// File Upload Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },  
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });
// Routes
reportRoute.post("/create",auth_user, upload.single("file"), createReport);
reportRoute.get("/reports",auth_user, getReports);
export { reportRoute };