require("dotenv").config();

// const Users = require("../models").Users;
const Users = require("../models").Users;
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  createUser(request, response) {
    return Users.create({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    })
      .then((users) => response.status(201).send(users))
      .catch((error) => response.status(400).send(error));
  },
  getAllUsers(request, response) {
    return Users.findAll()
      .then((users) => response.status(200).send(users))
      .catch((error) => response.status(400).send(error));
  },
  getUserById(request, response) {
    return Users.findByPk(request.params.userId)
      .then((users) => {
        if (!users) {
          return response.status(404).send({ message: "User not found" });
        }
        return response.status(200).send(users);
      })
      .catch((error) => response.status(400).send(error));
  },
  updateUserById(request, response) {
    return Users.findByPk(request.params.userId).then((users) => {
      if (!users) {
        return response.status(404).send({
          message: "User not found",
        });
      }
      return users
        .update({
          name: request.body.name || users.name,
          email: request.body.email || users.email,
          password: request.body.password || users.password,
        })
        .then(() => response.status(200).send(users))
        .catch((error) => response.status(400).send(error));
    });
  },
  deleteUserById(request, response) {
    return Users.findByPk(request.params.userId)
      .then((users) => {
        if (!users) {
          return response.status(400).send({
            message: "User not found",
          });
        }
        return users
          .destroy()
          .then(() =>
            response.status(200).send({
              message: "User deleted successfully",
            })
          )
          .catch((error) => response.status(400).send(error));
      })
      .catch((error) => response.status(400).send(error));
  },
  login(request, response) {
    return Users.findOne({
      where: { email: request.body.email, password: request.body.password },
    })
      .then((users) => {
        if (!users) {
          return response.status(401).send({ auth: false, token: null });
        }
        let token = jwt.sign({ users }, JWT_SECRET_KEY, { expiresIn: 1200 });
        return response.status(200).send({ auth: true, token: token });
      })
      .catch((error) => response.status(400).send(error));
  },
  dashboard(request, response) {
    return Users.findOne(request.id)
      .then((users) => {
        if (!users) {
          return response.status(401).send({ auth: false, token: null });
        }
        return response.send(users);
      })
      .catch((error) => response.status(400).send(error));
  },
  logout(request, response) {
    response.status(200).send({ auth: false, token: null });
  },
};
