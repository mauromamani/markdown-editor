import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/github-markdown.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');
