const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(404).json({ error: 'Task name required' });
  }
  const newTask = {
    id: Date.now(),
    name: name,
    completed: false,
  };
  tasks.push(newTask);
  res.status(202).json(newTask);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { name, completed } = req.body;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (name) {
    task.name = name;
  }
  if (completed !== undefined) {
    task.completed = completed;
  }
  res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.sendStatus(202);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
