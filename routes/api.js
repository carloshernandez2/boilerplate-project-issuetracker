"use strict";

const Issue = require("../models/issueModel");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(async function (req, res) {
      const { project } = req.params;
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open,
        _id,
      } = req.query;
      const projectFilter = project ? { project } : {},
        issue_titleFilter = issue_title ? { issue_title } : {},
        issue_textFilter = issue_text ? { issue_text } : {},
        created_byFilter = created_by ? { created_by } : {},
        assigned_toFilter = assigned_to ? { assigned_to } : {},
        status_textFilter = status_text ? { status_text } : {},
        openFilter = open ? { open } : {},
        _idFilter = _id ? { _id } : {};
      const filter = {
        ...projectFilter,
        ...issue_titleFilter,
        ...issue_textFilter,
        ...created_byFilter,
        ...assigned_toFilter,
        ...status_textFilter,
        ...openFilter,
        ..._idFilter,
      };
      const issues = await Issue.find(filter).select("-project -__v");
      res.send(issues);
    })

    .post(async function (req, res) {
      const project = req.params.project || "apitest";
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to = "",
        status_text = "",
      } = req.body;
      if (issue_title && issue_text && created_by) {
        const issue = new Issue({
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
          project,
        });
        const savedIssue = await issue.save();
        res.send({ ...savedIssue._doc, project: undefined, __v: undefined });
      } else {
        res.send({ error: "required field(s) missing" });
      }
    })

    .put(async function (req, res) {
      const project = req.params.project || "apitest";
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        _id,
        open,
      } = req.body;
      try {
        if (_id) {
          if (
            !issue_title &&
            !issue_text &&
            !created_by &&
            !assigned_to &&
            !status_text &&
            !open
          ) {
            res.send({ error: "no update field(s) sent", _id: _id });
          } else {
            const issue = await Issue.findById(_id);
            issue.issue_title = issue_title || issue.issue_title;
            issue.issue_text = issue_text || issue.issue_text;
            issue.created_by = created_by || issue.created_by;
            issue.assigned_to = assigned_to || issue.assigned_to;
            issue.status_text = status_text || issue.status_text;
            issue.open = open || issue.open;
            issue.project = project || issue.project;
            await issue.save();
            res.send({ result: "successfully updated", _id: _id });
          }
        } else {
          res.send({ error: "missing _id" });
        }
      } catch (e) {
        res.send({ error: "could not update", _id: _id });
      }
    })

    .delete(async function (req, res) {
      const { _id } = req.body;
      try {
        if (_id) {
          await Issue.findByIdAndDelete(_id)
          res.send({ result: "successfully deleted", _id: _id });
        } else {
          res.send({ error: "missing _id" });
        }
      } catch (e) {
        res.send({ error: "could not delete", _id: _id });
      }
    });
};
