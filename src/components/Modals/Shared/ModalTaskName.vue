<template lang="pug">
.row.q-mb-sm
  q-input.col(
    autofocus
    outlined
    :model-value="props.name"
    ref='txtName'
    label='Task name'
    :rules="[val => !!val || 'This field is required']"
    @update:model-value="$emit('update:name', $event)"
  )
    template(v-slot:append)
      q-icon.cursor-pointer(
        v-if="props.name"
        name="close"
        @click="$emit('update:name', '')"
      )
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../../../stores/task'

const taskStore = useTaskStore()
const props = defineProps({
  name: String
})

const txtName = ref(null)

taskStore.isValid = () => {
  txtName.value.validate()
  return !txtName.value.hasError
}

</script>
