<template lang="pug">
div
  transition(
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  )
    q-banner.list-header.bg-grey-3(
      v-if="displayBanner()"
      :class="props.ok ? 'bg-green' : 'bg-secondary' "
      dense
      inline-actions
    )
      template(v-slot:avatar)
        q-icon(name="check" color="positive")
      | There is no tasks {{ props.title }}
      template(v-slot:action)
        q-btn(
          flat
          color="secondary"
          label="Add Task"
          @click="$emit('showAddTask')"
        )

  q-banner.list-header.text-white.text-center(
    v-if="!settingStore.settings.showTasksInOneList && props.tasks.length"
    :class="props.ok ? 'bg-green' : 'bg-secondary' "
    dense
    inline-actions
  )
    span.text-bold.text-subtitle-1 {{ props.title }}
  q-list(
    bordered
    separator
    v-if="props.tasks.length"
  )
    Task(
      :key="task.id",
      v-for="task in props.tasks",
      :task="task"
    )
</template>

<script setup>
import { useTaskStore } from "../../stores/task"
import { useSettingsStore } from 'src/stores/settings'
import Task from "components/Tasks/Task"

const taskStore = useTaskStore()
const settingStore = useSettingsStore()
const emit = defineEmits(['showAddTask'])
const props = defineProps({
  tasks: Array,
  title: String,
  ok: Boolean
})
const displayBanner = () => (
  !settingStore.settings.showTasksInOneList && !props.tasks.length && !taskStore.search
)
</script>

<style lang="sass">
.list-header
  border-radius: 5px 5px 0px 0px
  margin-top: 20px
</style>
