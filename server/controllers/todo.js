const Users = require("../models").Users;

const Todos = require("../models").Todos;
const TodoItems = require("../models").TodoItems;

module.exports = {
  create(request, response) {
    return Todos.create({
      title: request.body.title,
      userId: request.body.userId,
    })
      .then((todos) => response.status(201).send(todos))
      .catch((error) => response.status(400).send(error));
  },
  list(request, response) {
    return Todos.findAll({
      include: [
        {
          model: TodoItems,
          as: "todoitems",
        }
      ],
    })
      .then((todos) => response.status(200).send(todos))
      .catch((error) => response.status(400).send(error));
  },
  retrieve(request, response) {
    return Todo.findByPk(request.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => {
        if (!todo) {
          return response.status(404).send({
            message: "Todo Not Found",
          });
        }
        return response.status(200).send(todo);
      })
      .catch((error) => response.status(400).send(error));
  },
  update(request, response) {
    return Todo.findByPk(request.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => {
        if (!todo) {
          return response.status(404).send({
            message: "Todo not found",
          });
        }
        return todo
          .update({
            title: request.body.title || todo.title,
          })
          .then(() => response.status(200).send(todo))
          .catch((error) => response.status(400).send(error));
      })
      .catch((error) => response.status(400).send(error));
  },
  destroy(request, response) {
    return Todo.findByPk(request.params.todoId)
      .then((todo) => {
        if (!todo) {
          return response.status(400).send({
            message: "Todo not found",
          });
        }
        return todo
          .destroy()
          .then(() =>
            response.status(200).send({ message: "Todo deleted successfully" })
          )
          .catch((error) => response.status(400).send(error));
      })
      .catch((error) => response.status(400).send(error));
  },
};
