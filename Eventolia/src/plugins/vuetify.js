// plugins/vuetify.js

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

// Custom themes
const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#fcecfd',
    principal: '#F0A1F7',
    principal2: '#c55bda',
    principal3: '#780F80',
    text: '#3f0D44',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    image: '#000000',
    loginButton: '#0029FF',
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#3f0D44',
    principal: '#780F80',
    principal2: '#c55bda',
    principal3: '#F0A1F7',
    text: '#fcecfd',
    error: '#f44336',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    image: '#FFFFFF',
    loginButton: '#0029FF',
  },
}

export { myCustomDarkTheme, myCustomLightTheme }

let vuetify = createVuetify({
  components: {
    VNumberInput,
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
})


export default vuetify

// Toggle Theme function
export function toggleTheme(isDark) {
  vuetify.framework.theme.dark = isDark
}
