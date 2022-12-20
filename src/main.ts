import { v4 } from 'uuid';
import Toastify from 'toastify-js'


import "toastify-js/src/toastify.css"
import './style.css'

const taskForm = document.querySelector<HTMLFormElement>('#taskForm');
const tasksList = document.querySelector<HTMLDivElement>('#tasksList');

interface Task {
  id: string,
  title : string;
  description : string;
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['title'] as unknown as HTMLInputElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement
  if (title.value.length > 1) {

      tasks.push({
        id: v4(),
        title: title.value,
        description: description.value,
      })
    
      localStorage.setItem('tasks', JSON.stringify(tasks))

      Toastify({
        text: 'new task added',
      }).showToast()

      renderTask(tasks)

      taskForm.reset()
      title.focus()
  }else{
    Toastify({
      text: 'rquire title for task added',
      style: {
        background: "linear-gradient(to right, #ff0000, #240000)",
      }
    }).showToast()
  }
})

document.addEventListener('DOMContentLoaded',() => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  renderTask(tasks)
})

function renderTask(tasks: Task[]) {

  tasksList!.innerHTML = ''

  tasks.forEach((task) => {
    const taskElement = document.createElement('div')

    taskElement.className = 'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover: cursor-pointer'

    const header = document.createElement('header')
    header.className = 'flex justify-between'

    const title = document.createElement('span')
    title.innerText = task.title

    const description = document.createElement('p')
    description.innerText = task.description

    const id = document.createElement('small')
    id.innerText = task.id
    id.className = 'text-gray-500 text-xs'

    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Delete'
    btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md'

    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTask(tasks)
      Toastify({
        text : 'Task deleted successfully',
        style: {
          background: "linear-gradient(to right, #0b5004, #53b304)"
        }
      }).showToast()
    })
    
    header.append(title)
    header.append(btnDelete)
    
    taskElement.append(header)
    taskElement.append(description)
    taskElement.append(id)

    tasksList?.append(taskElement)
  })
}