import { defineStore } from 'pinia'
import { LocalStorage, Notify, uid } from 'quasar'

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
      Notify.create({
        icon: 'check',
        position: 'top-right',
        color: 'positive',
        message: 'New task created'
      })
    },
    updateTaskData(task) {
      const findedTask = this.tasks.find(t => t.id === task.id)
      if (!task) return null
      findedTask.nobre = task.nobre
      findedTask.dueDate = task.dueDate
      findedTask.dueTime = task.dueTime
      findedTask.completed = task.completed
      LocalStorage.set('tasks', this.tasks)
      Notify.create({
        icon: 'edit',
        position: 'top-right',
        color: 'accent',
        message: 'Task updated'
      })
    },
    updateTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return null
      task.completed = !task.completed
      LocalStorage.set('tasks', this.tasks)
      Notify.create({
        icon: task.completed ? 'check' : 'clear',
        position: 'top-right',
        color: task.completed ? 'positive' : 'orange-6',
        message: `Task ${task.completed ? 'done' : 'undone'}`
      })
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      LocalStorage.set('tasks', this.tasks)
      Notify.create({
        icon: 'delete',
        position: 'top-right',
        color: 'negative',
        message: 'Task deleted'
      })
    }
  }
})
