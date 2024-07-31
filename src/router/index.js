import { createWebHistory, createRouter } from 'vue-router'

const routes = [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/details/:id',
            name: 'Details',
            component: () => import('@/views/Details.vue')
        },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) return { el: to.hash, behavior: 'smooth' };
        return { top: 0, behavior: 'smooth' };
    }
  });
  
export default router;
