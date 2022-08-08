import { defineStore } from 'pinia'
import { LocalStorage, uid } from 'quasar'

const filter = (task, pattern) => (
  task.name.toLowerCase().includes(pattern.toLowerCase())
)

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
    addTask(task) {
      task.id = uid()
      this.tasks.push(task)
      LocalStorage.set('tasks', this.tasks)
    },
    updateTaskData(task) {
      const findedTask = this.tasks.find(t => t.id === task.id)
      if (!task) return null
      findedTask.nobre = task.nobre
      findedTask.dueDate = task.dueDate
      findedTask.dueTime = task.dueTime
      findedTask.completed = task.completed
      LocalStorage.set('tasks', this.tasks)
    },
    updateTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return null
      task.completed = !task.completed
      LocalStorage.set('tasks', this.tasks)
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      LocalStorage.set('tasks', this.tasks)
    }
  }
})
