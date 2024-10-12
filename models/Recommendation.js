const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cvId: { type: mongoose.Schema.Types.ObjectId, ref: "Cv", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Recommendation = mongoose.model("Recommendation", recommendationSchema);
module.exports = Recommendation;
