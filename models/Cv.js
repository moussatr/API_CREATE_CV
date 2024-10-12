const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    description: { type: String },
    education: [
      {
        institution: String,
        degree: String,
        year: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
      },
    ],
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Cv = mongoose.model("Cv", cvSchema);
module.exports = Cv;
