<template lang="pug">
q-input.col(
  outlined
  v-select-all
  v-model="taskStore.search"
  label="Search"
  @keyup.esc="clear"
)
  template(v-slot:append)
    q-icon.cursor-pointer(
      name="close"
      @click="clear"
    )
    q-icon(name="search")
</template>

<script setup>
import { useTaskStore } from '../../stores/task'
import { selectAll } from 'src/directives/directive-select-all'

const taskStore = useTaskStore()
const clear = () => taskStore.search = ''
const vSelectAll = selectAll
</script>
