<template lang="pug">
q-page.q-ma-md
  q-list(bordered separator v-if="taskStore.tasks.length")
    Task(:key="task.id", v-for="task in taskStore.tasks", :task="task")
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
import Task from "../components/Tasks/Task"
import AddTask from "../components/Modals/AddTask"

const taskStore = useTaskStore()
const showAddTask = ref(true)
</script>
