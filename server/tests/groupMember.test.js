const route = require("../routes/index.js").groupMember;
const controller = require("../controllers/index.js").groupMember;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(route.router);

jest.mock("../repositories/Repository.js", () =>
  jest.fn().mockImplementation(() => ({
    create: jest.fn(),
  })),
);

const mockedValue = {
  id: "1",
  role: "member",
  userId: "1",
  groupId: "1",
};

describe("POST groupMember/:id", () => {
  test("success", (done) => {
    controller.repository.create.mockImplementationOnce(() => mockedValue);
    request(app)
      .post(`/${route.basePath}`)
      .send({
        role: "member",
      })
      .expect(201, done);
  });
  test("failure: role is empty", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        role: "",
      })
      .expect(422, done);
  });
});
