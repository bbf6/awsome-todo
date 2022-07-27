<template>
  <q-page class="q-ma-md">
    <q-list bordered separator>
      <q-item
        tag="label"
        v-ripple :key="task.id"
        v-for="task in tasks"
        :class="task.completed ? 'bg-teal-1' : 'bg-amber-1'"
      >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            :class="{ 'text-strikethrough' : task.completed }"
          >
            {{ task.name }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="28px" class="q-mr-xs" />
            </div>
            <div class="column">
              <q-item-label caption>
                {{ task.dueDate }}
              </q-item-label>
              <q-item-label caption class="row justify-end">
                <small>{{ task.dueTime }}</small>
              </q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: 'Got to shop',
          completed: false,
          dueDate: '2019/05/12',
          dueTime: '10:00'
        },
        {
          id: 2,
          name: 'Get bananas',
          completed: true,
          dueDate: '2019/05/13',
          dueTime: '14:30'
        },
        {
          id: 1,
          name: 'Get apples',
          completed: false,
          dueDate: '2019/05/14',
          dueTime: '08:00'
        }
      ]
    }
  }
})
</script>
