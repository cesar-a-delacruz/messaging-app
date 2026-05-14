const route = require("../routes/index.js").message;
const controller = require("../controllers/index.js").message;
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
  content: "fakemessage",
  attachment: null,
};

describe("POST message/:id", () => {
  test("success", (done) => {
    controller.repository.create.mockImplementationOnce(() => mockedValue);
    request(app)
      .post(`/${route.basePath}`)
      .send({
        content: "fakemessage",
      })
      .expect(201, done);
  });
  test("failure: content is empty/short", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        content: "",
      })
      .expect(422, done);
  });
  test("failure: content is long", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        content:
          "fakemessageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      })
      .expect(422, done);
  });
});
