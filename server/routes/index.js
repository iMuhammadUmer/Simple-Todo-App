const verifyToken = require("../middleware/loginAuth");

const todosController = require("../controllers").todos;
const todoItemsController = require("../controllers").todoItems;
const authController = require("../controllers").auth;

module.exports = (app) => {
  app.get("/api", (request, response) =>
    response.status(200).send({
      message: "Welcome to Todos API",
    })
  );

  // services for todos
  app.post("/api/todos", todosController.create);
  app.get("/api/todos", todosController.list);
  app.get("/api/todos:todoId", todosController.retrieve);
  app.put("/api/todos/:todoId", todosController.update);
  app.delete("/api/todos/:todoId", todosController.destroy);

  // sevices for todo items with respect to todoId
  app.post("/api/todos/:todoId/items", todoItemsController.create);
  app.put("/api/todos/:todoId/items/:todoItemId", todoItemsController.update);
  app.delete(
    "/api/todos/:todoId/items/:todoItemId",
    todoItemsController.destroy
  );
  app.all("/api/todos/:todoId/items", (request, response) =>
    response.status(405).send({ message: "Method not allowed" })
  );

  // services for users
  app.post("/api/signup", authController.createUser);
  app.get("/api/users", authController.getAllUsers);
  app.get("/api/user/:userId", authController.getUserById);
  app.put("/api/user/:userId", authController.updateUserById);
  app.delete("/api/user/:userId", authController.deleteUserById);

  // services releted to Auth (login, logout)
  app.post("/api/login", authController.login);
  app.get("/api/logout", authController.logout);
  app.get("/api/dashboard", verifyToken, authController.dashboard);
};
