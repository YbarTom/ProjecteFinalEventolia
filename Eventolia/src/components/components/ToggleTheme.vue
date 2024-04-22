<template>
  <v-app>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  console.log(theme.global.name)
  console.log(this.$vuetify.theme.dark)
  theme.global.name = theme.global.current._value.dark ? 'light' : 'dark'
  console.log(theme.global.name)

}
</script>
