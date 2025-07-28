// src/main.ts

import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Creates the instance of the Vue application
const app = createApp(App);

app.use(router); //Use the router in application
app.mount('#app'); //Build the application in the HTML element with id 'app'
