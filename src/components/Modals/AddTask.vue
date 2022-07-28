<template lang="pug">
q-card
  ModalHeader="Add task"
  form(@submit.prevent='submitForm')
    q-card-section
      ModalTaskName(
        :name.sync="taskToSubmit.name"
        @update:name="e => taskToSubmit.name = e"
      )
      ModalTaskDueDate(
        :dueDate="taskToSubmit.dueDate"
        @update:dueDate="e => taskToSubmit.dueDate = e"
        @clear="clearDueDate"
      )
      ModalTaskDueTime(
        :dueDate="taskToSubmit.dueDate"
        :dueTime="taskToSubmit.dueTime"
        @update:dueTime="e => taskToSubmit.dueTime = e"
        @clear="clearDueDate"
      )
    ModalTaskButtons
</template>

<script setup>
import { ref } from "vue"
import { useTaskStore } from "../../stores/task"
import ModalHeader from './Shared/ModalHeader'
import ModalTaskName from './Shared/ModalTaskName'
import ModalTaskDueDate from './Shared/ModalTaskDueDate'
import ModalTaskDueTime from './Shared/ModalTaskDueTime'
import ModalTaskButtons from './Shared/ModalTaskButtons'

const emit = defineEmits(['close'])
const taskStore = useTaskStore()
const taskToSubmit = ref({
  id: 0,
  name: '',
  dueDate: '',
  dueTime: '',
  completed: false
})

const clearDueDate = () => {
  taskToSubmit.value.dueDate = ''
  taskToSubmit.value.dueTime = ''
}

const submitForm = () => {
  if (taskStore.isValid()) submitTask()
}

const submitTask = () => {
  taskStore.addTask(taskToSubmit.value)
  emit('close')
}
</script>
