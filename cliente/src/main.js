import { createApp } from 'vue';
import App from './App.vue';
import naive from 'naive-ui';

import router from './rutas/rutas.js';

const app = createApp(App)
app.use(naive)
app.use(router)
app.mount('#app')

////npm install naive-ui
