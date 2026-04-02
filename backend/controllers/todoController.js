const Todo = require("../models/Todo");

// CREATE
exports.createTodo = async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.user._id,
  });

  res.json(todo);
};

// GET TODOS (pagination + search)
exports.getTodos = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;

  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const todos = await Todo.find({ user: req.user._id, ...keyword })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json(todos);
};

// UPDATE
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo) {
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed ?? todo.completed;

    const updated = await todo.save();
    res.json(updated);
  }
};

// DELETE
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};