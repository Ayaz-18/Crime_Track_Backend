import mongoose from "mongoose";
const reportSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  file: {
    type: String,
    default: null,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
export default mongoose.model("Report", reportSchema);