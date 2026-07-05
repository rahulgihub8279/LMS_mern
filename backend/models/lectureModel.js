import mongoose from "mongoose";

const lecureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
      trim: true,
    },
    vedioUrl: {
      type: String,
    },
    isPreviewFree: {
      type: Boolean,
    },
  },
  { timeseries: true },
);

const lectureModel = mongoose.model("Lecture", lecureSchema);
export default lectureModel;
