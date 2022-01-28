import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Settings from '@/views/Settings.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'setting',
    path: '/setting',
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'bg-one-dark-200',
});

export default router;
