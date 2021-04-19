const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema(
  {
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String, required: true },
    open: { type: Boolean, required: true },
    status_text: { type: String, required: true }
  },
  {
    timestamps: true
  }
)
const Issue = mongoose.model('Issue', issueSchema)

module.exports = Issue
