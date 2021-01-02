module.exports = app => {
    const todos = require('../controllers/todo.controller.js');
    let router = require('express').Router();

    // Create a new todo
    router.post('/', todos.create);

    // Retrieve all todos
    router.get('/', todos.findAll);

    // Retrieve all completed todos
    router.get('/completed', todos.findAllCompleted);

    // Retrieve a single todo with id
    router.get('/:id', todos.findOne);

    // Update a todo with id
    router.put('/:id', todos.update);

    // Delete a todo with id
    router.delete('/:id', todos.deleteOne);

    // Delete all todos
    router.delete('/', todos.deleteAll);

    app.use('/api/todos', router);
}
