const { response } = require("express");

const TodoItems = require("../models").TodoItems;

module.exports = {
  create(request, response) {
    return TodoItems.create({
      content: request.body.content,
      complete: request.body.complete,
      todoId: request.params.todoId,
    })
      .then((todoItems) => response.status(201).send(todoItems))
      .catch((error) => response.status(400).send(error));
  },
  update(request, response) {
    return TodoItem.findOne({
      where: {
        id: request.params.todoItemId,
        todoId: request.params.todoId,
      },
    })
      .then((todoItem) => {
        if (!todoItem) {
          return response.status(404).send({
            message: "TodoItem not found",
          });
        }
        return todoItem
          .update({
            content: request.body.content || todoItem.content,
            complete: request.body.complete || todoItem.complete,
          })
          .then((updatedTodoItem) => response.status(200).send(updatedTodoItem))
          .catch((error) => response.status(400).send(error));
      })
      .catch((error) => response.status(400).send(error));
  },

  destroy(request, response) {
    return TodoItem.findOne({
      where: {
        id: request.params.todoItemId,
        todoId: request.params.todoId,
      },
    })
      .then((todoItem) => {
        if (!todoItem) {
          return response.status(404).send({
            message: "TodoItem not found",
          });
        }
        return todoItem
          .destroy()
          .then(() =>
            response
              .status(204)
              .send({ message: "Todo Item deleted successfullt" })
          )
          .catch((error) => response.status(400).send(error));
      })
      .catch((error) => response.status(400).send(error));
  },
};
