import './assets/main.css'
import 'font-awesome/css/font-awesome.min.css'

import { createApp } from 'vue'
import router from './routes'

import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa4'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Colors from '../Colors'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'InovationTheme',
    themes: {
      InovationTheme: {
        dark: false,
        colors: {
          ...Colors
        }
      }
    }
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  },
  components,
  directives
})

createApp(App).use(vuetify).use(router).mount('#app')
