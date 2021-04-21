const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("View issues on a project: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest?_id=608033cd1e00672fe0d892cf")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/apitest?_id=608033cd1e00672fe0d892cf&open=true")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });

  test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_title: "Patulekasss",
        issue_text: "vjvj",
        created_by: "Helen",
        assigned_to: "Halos",
        status_text: "Perrito",
      })
      .end(function (err, res) {
        const expected = {
          open: true,
          issue_title: "Patulekasss",
          issue_text: "vjvj",
          created_by: "Helen",
          assigned_to: "Halos",
          status_text: "Perrito",
        };
        const resultObject = {
          open: res.body.open,
          issue_title: res.body.issue_title,
          issue_text: res.body.issue_text,
          created_by: res.body.created_by,
          assigned_to: res.body.assigned_to,
          status_text: res.body.status_text,
        };
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_title: "Patulekasss",
        issue_text: "vjvj",
        created_by: "Helen",
      })
      .end(function (err, res) {
        const expected = {
          open: true,
          issue_title: "Patulekasss",
          issue_text: "vjvj",
          created_by: "Helen",
          assigned_to: "",
          status_text: "",
        };
        const resultObject = {
          open: res.body.open,
          issue_title: res.body.issue_title,
          issue_text: res.body.issue_text,
          created_by: res.body.created_by,
          assigned_to: res.body.assigned_to,
          status_text: res.body.status_text,
        };
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/apitest")
      .send({
        issue_text: "vjvj",
        created_by: "Helen",
      })
      .end(function (err, res) {
        const expected = { error: "required field(s) missing" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "6080343ee333ee0688cc103d",
        issue_title: "Patuleka",
      })
      .end(function (err, res) {
        const expected = {
          result: "successfully updated",
          _id: "6080343ee333ee0688cc103d",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "6080343ee333ee0688cc103d",
        issue_title: "Patuleka",
        issue_text: "vjvj",
      })
      .end(function (err, res) {
        const expected = {
          result: "successfully updated",
          _id: "6080343ee333ee0688cc103d",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        issue_title: "Patuleka",
        issue_text: "vjvj",
      })
      .end(function (err, res) {
        const expected = { error: "missing _id" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "6080343ee333ee0688cc103d",
      })
      .end(function (err, res) {
        const expected = {
          error: "no update field(s) sent",
          _id: "6080343ee333ee0688cc103d",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/apitest")
      .send({
        _id: "bxqwodqxbi",
        issue_text: "vjvj",
      })
      .end(function (err, res) {
        const expected = { error: "could not update", _id: "bxqwodqxbi" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({
        _id: "608035aa31bd1327581b253e",
      })
      .end(function (err, res) {
        const expected = {
          result: "successfully deleted",
          _id: "608035aa31bd1327581b253e",
        };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({
        _id: "ncasocankx",
      })
      .end(function (err, res) {
        const expected = { error: "could not delete", _id: "ncasocankx" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });

  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/apitest")
      .send({})
      .end(function (err, res) {
        const expected = { error: "missing _id" };
        const resultObject = res.body;
        assert.equal(res.status, 200);
        assert.deepStrictEqual(resultObject, expected);
        done();
      });
  });
});
