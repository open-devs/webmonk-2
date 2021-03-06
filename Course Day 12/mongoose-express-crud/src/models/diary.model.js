const mongoose = require("mongoose")

const diarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    user: { type: Object, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
)

module.exports = mongoose.model("diary", diarySchema)
