<template lang="pug">
q-page.q-ma-md
  TaskList(title="Todo" :tasks="taskStore.tasksTodo" :ok="false" @showAddTask="showAddTask = true")
  TaskList(title="Done" :tasks="taskStore.tasksDone" :ok="true" @showAddTask="showAddTask = true")

  .absolute-bottom.text-center.q-mb-lg
    q-btn(
      @click="showAddTask = true"
      round
      color="primary text-grey-8"
      size="24px"
      icon="add"
    )
  q-dialog(v-model="showAddTask")
    AddTask(@close="showAddTask = false")
</template>

<script setup>
import { ref } from "vue"
import { useTaskStore } from "../stores/task"
import AddTask from "../components/Modals/AddTask"
import TaskList from '../components/Tasks/TaskList'

const taskStore = useTaskStore()
const showAddTask = ref(false)
</script>
