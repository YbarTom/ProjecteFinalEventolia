<template>
  <div class="text-field">
    <v-text-field :label="textFieldValue"></v-text-field>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textFieldValue = ref('');

const props = defineProps({
  text: String
});

onMounted(() => {
  textFieldValue.value = props.text;
});
</script>

<style scoped>
.text-field {
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  width: 350px;
}
</style>
