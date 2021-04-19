"use strict";

const Issue = require("../models/issueModel");

module.exports = function (app) {

  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      res.send(project);
    })

    .post(async function (req, res) {
      let project = req.params.project;
      const issue = new Issue({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        open: req.body.open,
        status_text: req.body.status_text,
        });
        const savedIssue = await issue.save()
        res.send(savedIssue)
      res.send(project);
    })

    .put(function (req, res) {
      let project = req.params.project;
      res.send(project);
    })

    .delete(function (req, res) {
      let project = req.params.project;
      res.send(project);
    });
};
