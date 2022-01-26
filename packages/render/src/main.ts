import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/github-markdown.css';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
