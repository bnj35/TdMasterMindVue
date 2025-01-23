import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import gameConfig from './plugins/gameConfig'
import profile from './plugins/profile'

const app = createApp(App)

app.use(gameConfig);
app.use(profile);

app.use(router)

app.mount('#app')
