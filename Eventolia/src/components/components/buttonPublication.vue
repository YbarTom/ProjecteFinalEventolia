<template>
  <div class="svg-container">
    <v-icon icon="mdi-heart" class="text-text" />

  </div>
</template>

<script setup>
import heartWhite from '../../assets/iconsImages/heartWhite.svg';
import saveWhite from '../../assets/iconsImages/saveWhite.svg';
import chatWhite from '../../assets/iconsImages/chatWhite.svg';
import sendWhite from '../../assets/iconsImages/sendWhite.svg';
import heart from '../../assets/iconsImages/heart.svg';
import save from '../../assets/iconsImages/save.svg';
import chat from '../../assets/iconsImages/chat.svg';
import send from '../../assets/iconsImages/send.svg';
import { useTheme } from "vuetify";
import { defineProps } from 'vue';

const theme = useTheme();

const props = defineProps({
  type: String,
  buttonText: String
});

let svgPath;
if (theme.global.current._value.dark) {
  if (props.type === 'heart') svgPath = heartWhite;
  else if (props.type === 'save') svgPath = saveWhite;
  else if (props.type === 'chat') svgPath = chatWhite;
  else if (props.type === 'send') svgPath = sendWhite;
} else {
  if (props.type === 'heart') svgPath = heart;
  else if (props.type === 'save') svgPath = save;
  else if (props.type === 'chat') svgPath = chat;
  else if (props.type === 'send') svgPath = send;
}
</script>

<style scoped>
.svg-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
  /* Ajusta el espacio entre el icono y el texto */
}
</style>
