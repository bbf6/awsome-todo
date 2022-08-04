<template lang="pug">
.row.q-mb-sm
  q-input.col(
    autofocus
    outlined
    clearable
    v-select-all
    :model-value="props.name"
    ref='txtName'
    label='Task name'
    :rules="[val => !!val || 'This field is required']"
    @update:model-value="$emit('update:name', $event)"
  )
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from 'src/stores/task'
import { selectAll } from 'src/directives/directive-select-all'

const taskStore = useTaskStore()
const props = defineProps({
  name: String
})

const txtName = ref(null)

taskStore.isValid = () => {
  txtName.value.validate()
  return !txtName.value.hasError
}

const vSelectAll = selectAll
</script>
