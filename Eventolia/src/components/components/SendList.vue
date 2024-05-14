<template>
  <div class="background">

  </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from 'vue';
import * as funcionsCM from '../../communicationsManager.js'

const comments = ref([])

const props = defineProps({
  post: Object
})

onMounted(async () => {

})
</script>
<style scoped>

.background {
  background-color: aqua;
  width: 100%;
  height: 100%;
}
</style>
