const db = require('../models');
const Todo = db.todos;

// Create and save a new Todo
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        res.status(400).send({
            message: "Title cannot be empty."
        });
        return;
    }

    // Create Todo
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed ? req.body.completed : false
    });

    // Save todo in database
    todo.save(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'An error occurred while creating the item.'
            });
        });
};

// Retrieve all todos from db
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { 
        title: { 
            $regex: new RegExp(title), 
            $options: 'i' 
        }} : {};
    
    Todo.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'An error occurred while retrieving items.'
            });
        });
};

// Find a single todo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Todo.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: "Item with id " + id + " not found."
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500)
            .send({
                message: "Error retrieving item with id " + id
            })
        });
};

// Update a todo by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id; 

    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: "Cannot update item with id=${id}. Item does not exist."
                })
            } else {
                res.send({
                    message: 'Item was updated successfully.'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating item with id=" + id
            });
        });
};

// Delete a todo with the specified id in the request
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot delete item with id=${id}. Item does not exist."
                });
            } else  {
                res.send({
                    message: "Item was deleted successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete item with id=" + id
            });
        });
};

// Delete all todos from database
exports.deleteAll = (req, res) => {
    Todo.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} items were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting all items."
            });
        })
};

// Find all completed todos with completed === true;
exports.findAllCompleted = (req, res) => {
    Todo.find({completed: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving items."
            });
        });
};