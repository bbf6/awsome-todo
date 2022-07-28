<template lang="pug">
.row.q-mb-sm
  q-input(
    outlined
    :model-value='props.dueDate'
    @input="$emit('update:dueDate', $event)"
    label='Due date'
  )
    template(v-slot:append)
      q-icon.cursor-pointer(
        v-if="props.dueDate"
        name="close"
        @click="$emit('clear')"
      )
      q-icon.cursor-pointer(name='event')
        q-popup-proxy
          q-date(
            text-color='grey-8'
            :model-value='props.dueDate'
            @update:model-value="$emit('update:dueDate', $event)"
          )
</template>

<script setup>
const props = defineProps({
  dueDate: String
})
</script>
