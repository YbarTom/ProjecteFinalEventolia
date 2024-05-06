<template>
  <div :class="{ button: true, 'bg-warning': isSelected }" @click="selectUser">
    <div class="svg-container">

    </div>
    <h3 class="text-text">{{ buttonText }}</h3>
  </div>
</template>

<script>
import { ref, defineEmits } from 'vue';

export default {
  props: {
    buttonText: String,
  },
  setup(props, { emit }) {
    const isSelected = ref(false);

    const selectUser = () => {
      isSelected.value = !isSelected.value;
      // Emitir un evento solo si el usuario está seleccionado
      if (isSelected.value) {
        emit('selectUser', props.buttonText);
      }
    };

    return {
      isSelected,
      selectUser
    };
  }
};
</script>






<style scoped>
.button {
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.svg-container {
  height: 55px;
  width: 55px;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

h3 {
  margin: 0;
}
</style>
