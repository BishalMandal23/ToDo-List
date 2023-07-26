let tasks = []

function addTask(name) {
  const newTask = {
    id: Date.now(),
    name: name,
    completed: false
  }
  tasks.push(newTask)
}

function renderTasks() {
  const taskList = document.getElementById('taskListItems')
  if (!taskList) {
    return
  }
  taskList.innerHTML = ''

  tasks.forEach((task) => {
    const listItem = document.createElement('li')
    listItem.className = 'task-list-item'

    const label = document.createElement('label')
    label.className = 'task-list-item-label'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'

    const taskName = document.createElement('span')
    taskName.textContent = task.name

    listItem.appendChild(label)
    label.appendChild(checkbox)
    label.appendChild(taskName)

    taskList.appendChild(listItem)
  })
}

const addTaskButton = document.getElementById('addTaskButton')
if (addTaskButton) {
  addTaskButton.addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput')
    if (!taskInput) {
      return
    }
    const taskName = taskInput.value.trim()

    if (taskName !== '') {
      addTask(taskName)
      taskInput.value = ''
      renderTasks()
    }
  })
}
