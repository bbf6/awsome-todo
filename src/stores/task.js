import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { api } from 'src/boot/axios'
import { showOkAlert, showErrorAlert } from 'src/lib/notification'

const filter = (task, pattern) => (
  task.name.toLowerCase().includes(pattern.toLowerCase())
)

const format = task => ({
  id: task.id,
  name: task.name,
  dueDate: task?.due_date?.substr(0, 10),
  dueTime: task?.due_date?.substr(11, 5),
  completed: task.is_completed
})

const saveParams = task => ({
  id: task.id,
  name: task.name,
  due_date: `${task.dueDate} ${task.dueTime}`
})

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: LocalStorage.getItem('tasks') || [],
    isValid: () => false,
    search: '',
    sortBy: 'name',
    loading: false
  }),
  getters: {
    tasksFiltered: state => state.tasks.filter(t => filter(t, state.search)),
    tasksSorted: state => (
      state.tasksFiltered.sort((a, b) => (
        a[state.sortBy].toLowerCase() > b[state.sortBy].toLowerCase()
      ))
    ),
    tasksTodo: state => state.tasksSorted.filter(t => !t.completed),
    tasksDone: state => state.tasksSorted.filter(t => t.completed)
  },
  actions: {
    load() {
      api.get('/tasks')
        .then(response => {
          this.tasks = response.data.map(format)
          LocalStorage.set('tasks', this.tasks)
        })
        .catch(error => showErrorAlert(error))
    },
    add(task) {
      api.post('/tasks', saveParams(task))
        .then(response => this.load())
        .catch(error => showErrorAlert(error))
    },
    update(task) {
      api.put(`/tasks/${task.id}`, saveParams(task))
        .then(response => this.load())
        .catch(error => showErrorAlert(error))
    },
    delete(id) {
      api.delete(`/tasks/${id}`)
        .then(response => this.load())
        .catch(error => showErrorAlert(error))
    },
    toggleCompletion(task) {
      const URL = task.completed ? '/tasks/undo_complete/' : '/tasks/complete/'
      api.post(`${URL}${task.id}`, {})
        .then(response => this.load())
        .catch(error => showErrorAlert(error))
    }
  }
})
