const route = require("../routes/index.js").group;
const controller = require("../controllers/index.js").group;
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
  name: "fakegroup",
  info: null,
  image: null,
};

describe("POST group/:id", () => {
  test("success", (done) => {
    controller.repository.create.mockImplementationOnce(() => mockedValue);
    request(app)
      .post(`/${route.basePath}`)
      .send({
        name: "fakegroup",
      })
      .expect(201, done);
  });
  test("failure: name is empty", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        name: "",
      })
      .expect(422, done);
  });
  test("failure: name is short", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        name: "fake",
      })
      .expect(422, done);
  });
  test("failure: name is long", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        name: "fakegrouppppppppppppp",
      })
      .expect(422, done);
  });
  test("failure: info is short", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        name: "fakegroup",
        info: "",
      })
      .expect(422, done);
  });
  test("failure: info is long", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        name: "fakegroup",
        info: "fakeinfoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
      })
      .expect(422, done);
  });
});
