import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SortingAlgorithmView from "../views/SortingAlgorithmView.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/algorithms/sorting-algorithm',
        name: 'algorithms',
        component: SortingAlgorithmView
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;