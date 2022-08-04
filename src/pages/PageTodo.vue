<template lang="pug">
q-page
  .q-pa-md.absolute.full-width.full-height.column
    .row.q-mb-lg
      Search
      Sort
    q-scroll-area.q-scroll-area-task
      .relative-position
        TaskList(title="Todo" :tasks="taskStore.tasksTodo" :ok="false" @showAddTask="showAddTask = true")
        TaskList.q-mb-xl(title="Done" :tasks="taskStore.tasksDone" :ok="true" @showAddTask="showAddTask = true")
        h5(v-if="displayNoResults()")="No results"

    .absolute-bottom.text-center.q-mb-lg.no-pointer-events
      q-btn.all-pointer-events(
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
import Search from '../components/Tools/Search'
import Sort from '../components/Tools/Sort'

const taskStore = useTaskStore()
const showAddTask = ref(false)
const displayNoResults = () => (
  !taskStore.tasksTodo.length && !taskStore.tasksDone.length
)
</script>

<style lang="sass">
.q-scroll-area-task
  display: flex
  flex-grow: 1
</style>
