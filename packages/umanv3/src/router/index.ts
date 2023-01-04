// import HelloWorldVue from "@/hello-world.vue";
import Blender from "@/pages/blender/index.vue";
import Calendar from "@/pages/calendar/index.vue";

// Event
import Event from "@/pages/event/index.vue";
import EventFocus from "@/pages/event/focus/index.vue";

import Housing from "@/pages/housing/index.vue";
import Login from "@/pages/login/login.vue";
import Price from "@/pages/price/index.vue";
import Reservation from "@/pages/reservation/_id.vue";
import Maintenance from "@/pages/maintenance/_id.vue";
import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";

// flows
import { EventFlow } from "../core/flows/EventFlow";
import { EventFocusFlow } from "../core/flows/EventFocusFlow";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Event",
    component: Event,
    beforeEnter: (_, __) => {
      EventFlow()
    }
  },
  {
    path: "/event/:id",
    name: "EventFocus",
    component: EventFocus,
    beforeEnter: (to: RouteLocationNormalized, __) => {
      const id: string | string[] = to.params.id;
      EventFocusFlow(id)
    }
  },
  { path: "/blender", name: "Blender", component: Blender },
  { path: "/login", name: "Login", component: Login},
  { path: "/housing", name: "Housing", component: Housing },
  { path: "/calendar", name: "Calendar", component: Calendar },
  { path: "/price", name: "Price", component: Price },
  { path: "/reservation/:id", name: "Reservation", component: Reservation },
  { path: "/maintenance/:id", name: "Maintenance", component: Maintenance },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;


