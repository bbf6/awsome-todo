<template lang="pug">
transition(
  appear
  enter-active-class="animated zoomIn"
  leave-active-class="animated zoomOut absolute-top"
)
  q-item(
    @click='taskStore.updateTask(task.id)'
    tag='label'
    :class="isCompleted ? 'bg-teal-1' : 'bg-amber-1'"
    v-touch-hold:1000.mouse="showEditTaskModal"
  )
    q-item-section(side top)
      q-checkbox(:model-value="isCompleted")
    q-item-section
      q-item-label(
        :class="{ 'text-strikethrough' : props.task.completed }"
        v-html="searchHighlight()"
      )
    q-item-section(side v-if="props.task.dueDate")
      .row
        .column.justify-center
          q-icon.q-mr-xs(name='event' size='28px')
        .column
          q-item-label(caption) {{ props.task.dueDate }}
          q-item-label.row.justify-end(caption)
            small {{ taskDueTime() }}
    q-item-section(side)
      .row
        q-btn(
          flat
          round
          dense
          color='primary'
          icon='edit'
          @click.stop="showEditTaskModal"
        )
        q-btn(
          flat
          round
          dense
          color='red-4'
          icon='delete'
          @click.stop='promptToDelete(task.id)'
        )
    q-dialog(v-model="showEditTask")
      EditTask(:task="task" @close="showEditTask = false")
</template>

<script setup>
import { computed, ref } from "vue"
import { date, useQuasar } from "quasar"
import { useTaskStore } from "../../stores/task"
import { useSettingsStore } from "src/stores/settings"
import EditTask from '../Modals/EditTask'

const $q = useQuasar()
const taskStore = useTaskStore()
const settingsStore = useSettingsStore()
const props = defineProps({
  task: Object
})
const showEditTask = ref(false)
const isCompleted = computed(() => props.task.completed)
const promptToDelete = (id) => {
  $q.dialog({
    title: "Confirm",
    message: "Really delete?",
    ok: { push: true },
    cancel: { color: "negative" },
    persistent: true,
  }).onOk(() => {
    taskStore.deleteTask(id)
  })
}
const showEditTaskModal = () => showEditTask.value = true
const getHiglihtedHtml = () => `<span class="bg-yellow-6">${taskStore.search}</span>`
const searchHighlight = () => {
  const search = taskStore.search
  if (!search)
    return props.task.name
  const searchRegex  = new RegExp(search, 'ig')
  return props.task.name.replace(searchRegex, getHiglihtedHtml())
}
const taskDueTime = () => {
  if (!settingsStore.settings.show12HourTimeFormat)
    return props.task.dueTime
  const fullDate = `${props.task.dueDate} ${props.task.dueTime}`
  return date.formatDate(fullDate, 'h:mmA')
}
</script>
