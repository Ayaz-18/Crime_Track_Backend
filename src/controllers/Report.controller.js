import Report from "../models/Report.model.js";
import User from "../models/User.models.js";
const createReport = async (req, res) => {
    try {
    const { description, location, priority } = req.body;
    const hash_email = req.user.hash_email; // Assuming auth middleware sets req.user
    const user=await User.findOne({hash_email});
    if(!user){
        return res.status(404).json({ success: false, message: "Login required" });
    }
    //console.log("Hash email from token:", hash_email); // Debugging line to check hash_email
    //console.log("User found:", user); // Debugging line to check if user is found
    const formattedPriority =
    priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

    const report = new Report({
      description,
      location,
      priority: formattedPriority,
      file: req.files && req.files.length > 0 ? req.files[0].path : null,
      user: user._id
    });

    await report.save();

    res.status(201).json({
      success: true,
      message: "Report submitted",
      data: report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getReports = async (req, res) => {
    try {
    const hash_email = req.user.hash_email; // Assuming auth middleware sets req.user
    const user=await User.findOne({hash_email});
    if(!user){
        return res.status(404).json({ success: false, message: "Login required" });
    }

    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export { createReport, getReports };
    