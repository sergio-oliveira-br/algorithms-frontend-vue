// src/router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SortingAlgorithmView from "../views/SortingAlgorithmView.vue";
import LinearSearchMinMax from "@/views/LinearSearchMinMax.vue";


const routes: RouteRecordRaw[] = [
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
    {
        path: '/linear-search/find-min-max',
        name: 'linear-search-min-max',
        component: LinearSearchMinMax
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;