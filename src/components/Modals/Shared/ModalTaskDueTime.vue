<template lang="pug">
.row.q-mb-sm(v-if="props.dueDate")
  q-input.col(
    outlined
    :model-value='props.dueTime'
    @update:model-value="$emit('update:dueTime', $event)"
    mask='time'
    :rules="['time']" label='Due time'
  )
    template(v-slot:append)
      q-icon.cursor-pointer(
        v-if="props.dueTime"
        name="close"
        @click="$emit('update:dueTime', '')"
      )
      q-icon.cursor-pointer(name='access_time')
        q-popup-proxy
          q-time(
            text-color='grey-8'
            :model-value='props.dueTime'
            @update:model-value="$emit('update:dueTime', $event)"
          )
</template>

<script setup>
const props = defineProps({
  dueDate: String,
  dueTime: String
})
</script>
