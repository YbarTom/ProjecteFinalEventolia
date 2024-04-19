/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#fcecfd',
    text: '#3f0D44',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    image: '#000000',
  },

}
const myCustomDarkTheme = {
  dark: true, // Establecer el modo oscuro en verdadero
  colors: {
    background: '#3f0D44', // Color de fondo oscuro
    text: '#fcecfd', // Color de texto
    error: '#f44336', // Color de error
    info: '#2196F3', // Color de información
    success: '#4CAF50', // Color de éxito
    warning: '#FFC107', // Color de advertencia
    image: '#FFFFFF', // Color de imagen
  },
}

export{myCustomDarkTheme, myCustomLightTheme}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
})
