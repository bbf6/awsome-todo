<template lang="pug">
router-view
</template>

<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const goToSettings = () => window.location.href = '/settings'

onMounted(() => {
  // if ($q.platform.is.electron)
  //   require('electron').ipcRenderer.on('show-settings', goToSettings)
})
</script>
