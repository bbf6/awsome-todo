<template lang="pug">
q-page(v-if="!taskStore.loading")
  .q-pa-md.absolute.full-width.full-height.column
    .row.q-mb-lg
      search
      sort
    q-scroll-area.q-scroll-area-task
      .relative-position
        task-list(
          title="Todo"
          :tasks="taskStore.tasksTodo"
          :ok="false"
          @showAddTask="showAddTask = true"
        )
        task-list.q-mb-xl(
          title="Done"
          :tasks="taskStore.tasksDone"
          :ok="true"
          @showAddTask="showAddTask = true"
        )
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
    add-task(@close="showAddTask = false")
q-page(v-else)
  .absolute-center
    q-spinner(color="primary" size="5em")
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/task'
import consumer from 'src/lib/cable'
import AddTask from '../components/Modals/AddTask'
import TaskList from '../components/Tasks/TaskList'
import Search from '../components/Tools/Search'
import Sort from '../components/Tools/Sort'

const taskStore = useTaskStore()
const showAddTask = ref(false)
const displayNoResults = () => (
  !taskStore.tasksTodo.length && !taskStore.tasksDone.length
)

const configCable = () =>
  consumer.subscriptions.create('TasksNotificationsChannel', {
    connected: () => console.log('Connected to tasks_notifications_channel'),
    disconnected: () => console.log('Disconnected from tasks_notifications_channel'),
    received: data => taskStore.load()
  })

onMounted(() => {
  taskStore.load()
  configCable()
})
</script>

<style lang="sass">
.q-scroll-area-task
  display: flex
  flex-grow: 1
</style>
