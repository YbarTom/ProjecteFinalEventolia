<template>
  <v-btn @click="toggleDarkMode">Toggle Dark Mode</v-btn>
</template>


<script>
import vuetify from '@/plugins/vuetify.js'

export default {
  methods: {
    toggleDarkMode() {
      console.log(vuetify.theme.current._value.dark)
      if (vuetify.theme.current._value.dark) {
        console.log('light')
        console.log(vuetify.theme.themes._value.myCustomLightTheme)
        vuetify.theme.current._value = vuetify.theme.themes._value.myCustomLightTheme
        console.log(vuetify.theme.current)
      } else {
        console.log('dark')
        console.log(vuetify.theme.themes._value.myCustomDarkTheme)
        vuetify.theme.current._value = vuetify.theme.themes._value.myCustomDarkTheme
        console.log(vuetify.theme.current)

      }
    },
  },
  // ...
}
</script>


