import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import { VueQueryPlugin } from "vue-query";



const app = createApp(App)


app.mount('#app')
app.use(VueQueryPlugin);
