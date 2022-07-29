import { defineStore } from 'pinia'
import { uid } from 'quasar'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [
      {
        id: 1,
        name: 'Got to shop',
        completed: false,
        dueDate: '2019/05/12',
        dueTime: '10:00'
      },
      {
        id: 2,
        name: 'Get bananas',
        completed: true,
        dueDate: '2019/05/13',
        dueTime: '14:30'
      },
      {
        id: 3,
        name: 'Get apples',
        completed: false,
        dueDate: '2019/05/14',
        dueTime: '08:00'
      }
    ],
    isValid: () => false
  }),

  getters: {
    tasksTodo (state) {
      return state.tasks.filter(t => !t.completed)
    },
    tasksDone (state) {
      return state.tasks.filter(t => t.completed)
    }
  },

  actions: {
    addTask(task) {
      task.id = uid()
      this.tasks.push(task)
    },
    updateTaskData(task) {
      const findedTask = this.tasks.find(t => t.id === task.id)
      if (!task) return null
      findedTask.nobre = task.nobre
      findedTask.dueDate = task.dueDate
      findedTask.dueTime = task.dueTime
      findedTask.completed = task.completed
    },
    updateTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (!task) return null
      task.completed = !task.completed
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})
