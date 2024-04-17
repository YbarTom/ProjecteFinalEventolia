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
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#1867C0',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },

}
const myCustomDarkTheme = {
  dark: true, // Establecer el modo oscuro en verdadero
  colors: {
    background: '#3f0D44', // Color de fondo oscuro
    surface: '#1e1e1e', // Superficie oscura
    'surface-bright': '#333333', // Superficie más clara
    'surface-light': '#424242', // Superficie luminosa
    'surface-variant': '#FFFFFF', // Variante de superficie
    'on-surface-variant': '#333333', // Color de texto en superficie variante
    primary: '#90caf9', // Color primario
    'primary-darken-1': '#64b5f6', // Tonos más oscuros del color primario
    secondary: '#ffb74d', // Color secundario
    'secondary-darken-1': '#ffa726', // Tonos más oscuros del color secundario
    error: '#f44336', // Color de error
    info: '#2196F3', // Color de información
    success: '#4CAF50', // Color de éxito
    warning: '#FFC107', // Color de advertencia
  },
}
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
})
