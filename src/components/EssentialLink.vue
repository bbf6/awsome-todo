<template lang="pug">
q-item(
  clickable
  tag="a"
  :to="link"
  exact
  class="text-grey-8"
)
  q-item-section(v-if="icon" avatar)
    q-icon(:name="icon")
  q-item-section
    q-item-label {{ title }}
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: "#"
    },
    icon: {
      type: String,
      default: ""
    }
  }
})
</script>
