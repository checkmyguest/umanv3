import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HelloWorldVue from '../components/HelloWorld.vue';
import Blender from '../components/pages/blender/index.vue';
import Calendar from '../components/pages/calendar/index.vue';
import Event from '../components/pages/event/index.vue';
import Housing from '../components/pages/housing/index.vue';
import Price from '../components/pages/price/index.vue';
import Reservation from '../components/pages/reservation/index.vue';
import TestRouter from '../components/test-router/TestRouter.vue';

const routes: Array<RouteRecordRaw> = [
    {path: '/', name: 'Home', component: HelloWorldVue},
    {path: '/event', name: 'Event', component: Event},
    {path: '/blender', name: 'Blender', component: Blender},
    {path: '/housing', name: 'Housing', component: Housing},
    {path: '/calendar', name: 'Calendar', component: Calendar},
    {path: '/price', name: 'Price', component: Price},
    {path: '/reservation', name: 'Reservation', component: Reservation},
    {path: '/test-router', name: 'TestRouter', component: TestRouter}
  ];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;