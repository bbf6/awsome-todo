<template lang="pug">
q-select.col.q-ml-sm(
  filled
  v-model="taskStore.sortBy"
  :options="options"
  emit-value
  map-options
  label="Sort by"
  stack-label
)
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from "../../stores/task"

const taskStore = useTaskStore()
const options = ref([
  { label: 'Name', value: 'name' },
  { label: 'Date', value: 'dueDate' }
])
</script>

<style lang="sass" scoped>
.q-select
  flex: 0 0 112px
</style>
