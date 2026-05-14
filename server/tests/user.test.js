const route = require("../routes/index.js").user;
const controller = require("../controllers/index.js").user;
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
  username: "fakeuser",
  fullname: "fake user",
  password: "fakepassword",
  bio: null,
  image: null,
};

describe("POST user/:id", () => {
  test("success", (done) => {
    controller.repository.create.mockImplementationOnce(() => mockedValue);
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake user",
        password: "fakepassword",
      })
      .expect(201, done);
  });
  test("failure: username is empty", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "",
        fullname: "fake user",
        password: "fakepassword",
      })
      .expect(422, done);
  });
  test("failure: username is short", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fake",
        fullname: "fake user",
        password: "fakepassword",
      })
      .expect(422, done);
  });
  test("failure: username is long", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuserrrrrrrrrrrrrr",
        fullname: "fake user",
        password: "fakepassword",
      })
      .expect(422, done);
  });
  test("failure: fullname is empty", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "",
        password: "fakepassword",
      })
      .expect(422, done);
  });
  test("failure: fullname is short", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake",
        password: "fakepassword",
      })
      .expect(422, done);
  });
  test("failure: fullname is long", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        password: "fakepassword",
      })
      .expect(422, done);
  });
  test("failure: password is empty", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake user",
        password: "",
      })
      .expect(422, done);
  });
  test("failure: password is short", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake",
        password: "fakepas",
      })
      .expect(422, done);
  });
  test("failure: passsword is long", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake user",
        password:
          "fakepasswordddddddddddddddddddddddddddddddddddddddddddddddddd",
      })
      .expect(422, done);
  });
  test("failure: bio is short", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake user",
        password: "fakepassword",
        bio: "",
      })
      .expect(422, done);
  });
  test("failure: bio is long", (done) => {
    request(app)
      .post(`/${route.basePath}`)
      .send({
        username: "fakeuser",
        fullname: "fake user",
        password: "fakepassword",
        bio: "fakebiooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
      })
      .expect(422, done);
  });
});
