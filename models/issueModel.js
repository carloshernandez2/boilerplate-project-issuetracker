const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String },
    open: { type: Boolean, required: true, default: true },
    status_text: { type: String },
    project: { type: String, required: true, default: "apitest" },
  },
  {
    timestamps: { createdAt: "created_on", updatedAt: "updated_on" },
  }
);
const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
