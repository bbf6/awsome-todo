<template lang="pug">
q-item(
  @click='taskStore.updateTask(task.id)'
  tag='label'
  :class="isCompleted ? 'bg-teal-1' : 'bg-amber-1'"
)
  q-item-section(side top)
    q-checkbox(:model-value="isCompleted")
  q-item-section
    q-item-label(:class="{ 'text-strikethrough' : props.task.completed }")
      | {{ props.task.name }}
  q-item-section(side v-if="props.task.dueDate")
    .row
      .column.justify-center
        q-icon.q-mr-xs(name='event' size='28px')
      .column
        q-item-label(caption) {{ props.task.dueDate }}
        q-item-label.row.justify-end(caption)
          small {{ props.task.dueTime }}
  q-item-section(side)
    q-btn(
      flat
      round
      dense
      color='red-4'
      icon='delete'
      @click.stop='promptToDelete(task.id)'
    )
</template>

<script setup>
import { computed } from "vue"
import { useQuasar } from "quasar"
import { useTaskStore } from "../../stores/task"

const $q = useQuasar()
const taskStore = useTaskStore()
const props = defineProps({
  task: Object
})
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
</script>
