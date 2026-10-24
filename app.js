require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

let todos = [
    {
        id: 1,
        title: "Learn Node.js",
        completed: false
    },
    {
        id: 2,
        title: "Build my CRUD API",
        completed: false
    }
]

app.get('/todos', (req, res) => {
    res.status(200).json(todos)
})

app.post('/todos', (req, res) => {
    const { title, completed } = req.body
    const newTodo = {
        id: todos.length + 1,
        title,
        completed
    }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})

app.patch ('/todos/:id', (req, res) => {
    const { id } = req.params
    const { title, completed } = req.body
    const todo = todos.find(todo => todo.id === parseInt(id))
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' })
    }
    if (title) {
        todo.title = title
    }
    if (completed !== undefined) {
        todo.completed = completed
    }
    res.status(200).json(todo)
})

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params
    const index = todos.findIndex(todo => todo.id === parseInt(id))
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' })
    }
    todos.splice(index, 1)
    res.status(204).send()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 

    